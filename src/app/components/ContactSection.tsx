import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, Github, Linkedin, Send } from 'lucide-react';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ballubalaram2003@gmail.com',
      href: 'mailto:ballubalaram2003@gmail.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'balaram-b',
      href: 'https://www.linkedin.com/in/balaram-b-022ba031b',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Maverick-B9',
      href: 'https://github.com/Maverick-B9',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:ballubalaram2003@gmail.com?subject=Portfolio Inquiry from ${formData.name}&body=${formData.message} (From: ${formData.email})`;
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Let's Build Together
            </h2>
            <p className="text-[#9CA3AF] text-lg mb-12 font-medium max-w-md">
              Currently available for technical collaborations, AI engineering roles, and innovative system architecture projects.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#6366F1]/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-[2.5rem] bg-[#111111] border border-white/5 relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest ml-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#6366F1]/50 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#6366F1]/50 transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest ml-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#6366F1]/50 transition-colors resize-none"
                  placeholder="Describe your project or inquiry..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
