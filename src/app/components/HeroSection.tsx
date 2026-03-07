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
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20">
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Balaram B
          </h1>

          <p className="text-xl md:text-2xl text-white font-medium mb-4 leading-relaxed">
            Software Engineer building AI systems, real-time platforms, and scalable backend infrastructure.
          </p>

          <p className="text-lg text-[#9CA3AF] mb-10 leading-relaxed">
            I build real-world technology — from digital forensic analysis tools to AI-powered agriculture platforms used by real communities.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3.5 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] transition-all hover:translate-y-[-2px] font-medium shadow-lg shadow-indigo-500/20"
            >
              View Projects
            </button>
            <a
              href="/Balaram_B_Resume.pdf"
              download
              className="px-8 py-3.5 bg-[#1F1F1F] text-white rounded-xl border border-white/10 hover:bg-[#2A2A2A] transition-all hover:translate-y-[-2px] font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          <div className="text-sm text-[#9CA3AF] flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Mysore, India
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Open to internships and collaborations</span>
          </div>
        </motion.div>

        {/* Right Side: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="hidden lg:flex items-center justify-center opacity-80"
        >
          <AICore />
        </motion.div>
      </div>

      {/* Background Depth */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#6366F1]/5 to-transparent pointer-events-none -z-10" />
    </section>
  );
}
