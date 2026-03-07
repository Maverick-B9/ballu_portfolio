import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { IdentitySection } from './components/IdentitySection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { ChatbotButton } from './components/ChatbotButton';
import { BootSequence } from './components/BootSequence';
import { Starfield } from './components/Starfield';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] overflow-x-hidden relative">
      <Starfield />

      {/* Navigation */}
      <Navigation onChatOpen={() => setIsChatOpen(true)} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection onChatOpen={() => setIsChatOpen(true)} />
        <IdentitySection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Chatbot Button - Only show when chat is closed */}
      {!isChatOpen && (
        <ChatbotButton isOpen={isChatOpen} onClick={() => setIsChatOpen(!isChatOpen)} />
      )}
    </div>
  );
}