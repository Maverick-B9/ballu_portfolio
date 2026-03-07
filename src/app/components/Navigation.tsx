import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Command } from 'lucide-react';

interface NavigationProps {
  onChatOpen: () => void;
}

export function Navigation({ onChatOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'backdrop-blur-xl bg-[#0B0B0F]/80 border-white/5' : 'bg-transparent border-transparent'
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-white font-bold tracking-[0.2em] text-sm flex items-center gap-2 group"
          >
            <div className="w-6 h-6 rounded-full bg-[#4F9DFF] flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
              <div className="w-1.5 h-1.5 bg-[#0B0B0F] rounded-full" />
            </div>
            BALARAM_AI
          </button>

          <div className="hidden lg:flex items-center gap-10">
            {['mission', 'impact', 'projects', 'leadership', 'activity', 'terminal'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-white/40 hover:text-[#4F9DFF] transition-all text-[10px] uppercase font-bold tracking-[0.2em]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-white/30 text-[10px] uppercase tracking-widest font-mono">
            <Command className="w-3 h-3" /> K
          </div>

          <button
            onClick={onChatOpen}
            className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#4F9DFF]/10 hover:bg-[#4F9DFF]/20 backdrop-blur-sm border border-[#4F9DFF]/30 text-[#4F9DFF] transition-all text-[10px] uppercase font-bold tracking-[0.2em]"
          >
            <Sparkles className="w-3 h-3" />
            <span>Ask Balaram</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

