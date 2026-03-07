import { motion } from 'motion/react';
import { ArrowRight, Download, MessageSquare } from 'lucide-react';
import { AICore } from './AICore';

interface HeroSectionProps {
  onChatOpen: () => void;
}

export function HeroSection({ onChatOpen }: { onChatOpen: () => void }) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] text-[10px] font-bold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366F1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6366F1]"></span>
              </span>
              Systems Builder // Mysore, India
            </div>

            <h1 className="text-white text-6xl md:text-[64px] font-bold tracking-tighter mb-4">
              Balaram B
            </h1>
            <p className="text-2xl font-medium text-[#8B5CF6] mb-8 tracking-tight">
              Systems Builder • AI Engineer • Full-Stack Developer
            </p>

            <p className="text-[#9CA3AF] text-xl leading-relaxed mb-10 max-w-xl font-medium">
              I design and engineer real-world software systems —
              from digital forensic investigation platforms to AI-powered agriculture tools and large-scale student event platforms used by thousands.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#6366F1] text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-[#4F46E5] transition-all active:scale-[0.98]"
              >
                Explore Systems
              </button>
              <button
                onClick={onChatOpen}
                className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group/btn"
              >
                <MessageSquare className="w-4 h-4 text-[#6366F1]" />
                Ask Ballu AI
              </button>
              <a
                href="/Balaram_B_Resume.pdf"
                download
                className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#9CA3AF]" />
                Resume
              </a>
            </div>

            <div className="flex items-center gap-6 text-[#9CA3AF] text-sm font-medium border-t border-white/5 pt-8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                Open to internships and collaborations
              </div>
            </div>
          </motion.div>

          {/* Right Side: Animated Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <AICore />
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
