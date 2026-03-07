import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Phone, Github, Linkedin, Download, Instagram } from 'lucide-react';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[34px] font-bold text-white mb-6 tracking-tight">Let's Build Something Meaningful</h2>
          <p className="text-[#9CA3AF] text-lg font-medium max-w-2xl mx-auto mb-16">
            Available for worldwide collaborations, AI engineering roles, and innovative system architecture projects. Let's engineer the future together.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-20">
            {/* Email Card */}
            <a href="mailto:ballubalaram2003@gmail.com" className="p-8 rounded-[2.5rem] bg-[#151515] border border-[#1F1F1F] hover:border-[#6366F1]/30 transition-all group flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] transition-transform group-hover:scale-110 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest mb-1">Email</p>
              <p className="text-white font-bold">ballubalaram2003@gmail.com</p>
            </a>

            {/* Phone Card */}
            <div className="p-8 rounded-[2.5rem] bg-[#151515] border border-[#1F1F1F] hover:border-[#6366F1]/30 transition-all group flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] transition-transform group-hover:scale-110 mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest mb-1">Phone</p>
              <p className="text-white font-bold">+91 9449114920</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/Maverick-B9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
              <Github className="w-5 h-5 text-[#9CA3AF]" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/balaram-b-022ba031b" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#6366F1] text-white font-bold shadow-xl shadow-indigo-500/20 hover:bg-[#4F46E5] transition-all">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a href="https://instagram.com/balaram.b_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-[#9CA3AF] hover:text-white">
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
            <a href="/Balaram_B_Resume.pdf" download className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
              <Download className="w-5 h-5 text-[#9CA3AF]" />
              Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Background spotlight */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/[0.03] blur-[100px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
