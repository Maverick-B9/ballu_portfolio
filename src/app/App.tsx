import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { WhyIBuild } from './components/WhyIBuild';
import { SystemImpact } from './components/SystemImpact';
import { SystemsBuilt } from './components/SystemsBuilt';
import { LeadershipTimeline } from './components/LeadershipTimeline';
import { GitHubPanel } from './components/GitHubPanel';
import { DeveloperTerminal } from './components/DeveloperTerminal';
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

    // Ensure the page starts at the top on load
    if (!isBooting) {
      window.scrollTo(0, 0);
    }
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
      <main className="relative z-10">
        <HeroSection onChatOpen={() => setIsChatOpen(true)} />
        <WhyIBuild />
        <SystemImpact />
        <SystemsBuilt />
        <LeadershipTimeline />
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