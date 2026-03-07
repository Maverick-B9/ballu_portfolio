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
      icon: Phone,
      label: 'Phone',
      value: '+91 9449114920',
      href: 'tel:+919449114920',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Maverick-B9',
      href: 'https://github.com/Maverick-B9',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'balaram-b',
      href: 'https://www.linkedin.com/in/balaram-b-022ba031b',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! This is a demo form.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#1A1A1D] to-[#0B0B0F]" />

      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Let's collaborate on building intelligent solutions together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl text-white mb-8">Contact Information</h3>
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#4F9DFF]/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F9DFF]/20 to-[#5A4FCF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <info.icon className="w-6 h-6 text-[#4F9DFF]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">{info.label}</p>
                  <p className="text-white group-hover:text-[#4F9DFF] transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/70 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#4F9DFF]/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#4F9DFF]/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white/70 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#4F9DFF]/50 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#4F9DFF] hover:bg-[#4F9DFF]/90 text-white transition-all"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
