import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function IdentitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#1F3A5F]/20 to-[#0B0B0F]" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <motion.h2
            className="text-6xl md:text-8xl lg:text-9xl text-white mb-12 tracking-tight leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Engineering Intelligence
            <br />
            <span className="bg-gradient-to-r from-[#4F9DFF] via-[#5A4FCF] to-[#4F9DFF] bg-clip-text text-transparent">
              Into Machines
            </span>
          </motion.h2>

          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
              At the intersection of artificial intelligence and human ingenuity, 
              I build systems that learn, adapt, and solve.
            </p>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed">
              From developing intelligent platforms to leading technical communities, 
              every project is a step towards creating technology that truly matters.
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="mt-16 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-white/40"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
