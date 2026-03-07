import { motion } from 'motion/react';
import { Download, ArrowRight, MapPin, GraduationCap, Star, Rocket, MessageSquare } from 'lucide-react';
import { NeuralNetwork } from './NeuralNetwork';

export function HeroSection({ onChatOpen }: { onChatOpen: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0A0A0A]">
      <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              Available for Worldwide Collaboration
            </div>

            <h1 className="text-white text-6xl md:text-[64px] font-bold tracking-tighter mb-4">
              Balaram B
            </h1>
            <p className="text-2xl font-medium text-[#8B5CF6] mb-8 tracking-tight">
              Systems Engineer • AI Developer • Full-Stack Builder
            </p>

            <p className="text-[#9CA3AF] text-xl leading-relaxed mb-12 max-w-xl font-medium">
              I design and engineer real-world software systems — from digital forensic investigation platforms to AI-powered agriculture tools and large-scale student event platforms used by thousands.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#6366F1] text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-[#4F46E5] flex items-center gap-2 group"
              >
                Explore Systems
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onChatOpen}
                className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 flex items-center gap-2 group/btn"
              >
                <MessageSquare className="w-4 h-4 text-[#6366F1]" />
                Ask Ballu AI
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/Balaram_B_Resume.pdf"
                download
                className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#9CA3AF]" />
                Resume
              </motion.a>
            </div>

            {/* Quick Info Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-white/5">
              {[
                { icon: MapPin, text: 'Mysore, India' },
                { icon: GraduationCap, text: 'B.E Computer Science' },
                { icon: Star, text: 'CGPA: 9.08 / 10' },
                { icon: Rocket, text: 'Open to internships' }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-start gap-2">
                  <badge.icon className="w-4 h-4 text-[#6366F1]" />
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Neural Network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[500px] w-full hidden lg:block"
          >
            <div className="absolute inset-0 bg-[#6366F1]/5 blur-[120px] rounded-full" />
            <NeuralNetwork />
          </motion.div>
        </div>
      </div>

      {/* Background spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-500/[0.03] blur-[150px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
