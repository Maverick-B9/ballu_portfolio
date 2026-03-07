import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Users, Award, Briefcase } from 'lucide-react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: Code,
      title: 'Coding Club Secretary',
      description: 'Leading Stack Forge Coding Club',
    },
    {
      icon: Users,
      title: '300+ Developer Community',
      description: 'Building and mentoring tech enthusiasts',
    },
    {
      icon: Award,
      title: '12+ Technical Events',
      description: 'Organised and executed successfully',
    },
    {
      icon: Briefcase,
      title: '2500+ Students Reached',
      description: 'Through large-scale auction event',
    },
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#1A1A1D] to-[#0B0B0F]" />

      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Profile Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#1F3A5F]/50 via-[#5A4FCF]/30 to-[#4F9DFF]/20 backdrop-blur-sm border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-white/20 text-9xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  BB
                </motion.div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right: About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-5xl md:text-6xl text-white mb-6 tracking-tight">
              About Balaram B
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              A highly driven Computer Science Engineering student passionate about artificial 
              intelligence, machine learning and intelligent software systems. Balaram has 
              actively led technology initiatives, organised large scale technical events and 
              developed innovative digital platforms.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              With a proven track record of building production-level software projects and 
              collaborating with industry platforms like GeekWick on the IndeAminds platform, 
              Balaram is committed to fostering a vibrant developer community and creating 
              technology that makes a real impact.
            </p>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#4F9DFF]/50 transition-all"
                >
                  <item.icon className="w-6 h-6 text-[#4F9DFF] mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
