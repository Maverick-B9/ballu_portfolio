import { motion } from 'motion/react';
import { ArrowRight, Download, MessageSquare } from 'lucide-react';
import { AICore } from './AICore';

interface HeroSectionProps {
  onChatOpen: () => void;
}

export function HeroSection({ onChatOpen }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Depth - handled by global Starfield, adding local blur overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4F9DFF]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#5A4FCF]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 flex flex-col items-center">
        {/* AI Core Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-8"
        >
          <AICore />
        </motion.div>

        {/* Content */}
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-bold text-white mb-4 leading-none tracking-tighter">
              BALARAM B
            </h1>
            <h2 className="text-xl md:text-2xl text-[#4F9DFF] mb-12 tracking-[0.5em] font-medium opacity-90">
              AI SYSTEMS ENGINEER
            </h2>

            <motion.p
              className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              I build intelligent systems, scalable platforms, and real-world technology solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <button
                onClick={() => scrollToSection('why-i-build')}
                className="group px-10 py-5 bg-white text-[#0B0B0F] rounded-full hover:bg-[#F5F5F7] transition-all flex items-center gap-3 font-semibold text-lg"
              >
                <span>Explore Systems</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onChatOpen}
                className="px-10 py-5 bg-white/5 text-white rounded-full hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all flex items-center gap-3 font-semibold text-lg"
              >
                <MessageSquare className="w-5 h-5 text-[#4F9DFF]" />
                <span>Ask Balaram AI</span>
              </button>
              <button
                className="px-10 py-5 bg-transparent text-white/60 hover:text-white transition-all flex items-center gap-3 font-medium text-lg"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white to-transparent"
          animate={{ scaleY: [1, 0.5, 1], translateY: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

