import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { WhyIBuild } from './components/WhyIBuild';
import { SystemImpact } from './components/SystemImpact';
import { SystemsBuilt } from './components/SystemsBuilt';
import { GitHubExplorer } from './components/GitHubExplorer';
import { LeadershipTimeline } from './components/LeadershipTimeline';
import { GitHubPanel } from './components/GitHubPanel';
import { DeveloperTerminal } from './components/DeveloperTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { ChatbotButton } from './components/ChatbotButton';
import { BootSequence } from './components/BootSequence';
import { Starfield } from './components/Starfield';
import { Achievements } from './components/Achievements';
import { SkillsSection } from './components/SkillsSection';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Ensure the page starts at the top on load
    if (!isBooting) {
      window.scrollTo(0, 0);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isBooting]);


  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] overflow-x-hidden relative selection:bg-[#4F9DFF]/30">
      <Starfield />

      {/* Navigation */}
      <Navigation onChatOpen={() => setIsChatOpen(true)} />

      {/* Main Content */}
      <main className="relative z-10 spotlight-bg min-h-screen">
        <HeroSection onChatOpen={() => setIsChatOpen(true)} />
        <SystemImpact />
        <WhyIBuild />
        <SystemsBuilt />
        <GitHubExplorer />
        <LeadershipTimeline />
        <Achievements />
        <SkillsSection />
        <GitHubPanel />
        <DeveloperTerminal />
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