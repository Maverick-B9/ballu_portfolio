import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: ['Python', 'Java', 'C'],
    },
    {
      category: 'Technologies',
      skills: ['Machine Learning', 'Computer Vision', 'Artificial Intelligence'],
    },
    {
      category: 'Frameworks',
      skills: ['Flask', 'TensorFlow'],
    },
    {
      category: 'Database',
      skills: ['MySQL'],
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#1F3A5F]/10 to-[#0B0B0F]" />

      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Technologies & Skills
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Building with modern tools and frameworks to create intelligent solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-white/80 text-sm uppercase tracking-wider mb-6">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                    className="group p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#4F9DFF]/50 transition-all cursor-default"
                  >
                    <p className="text-white group-hover:text-[#4F9DFF] transition-colors">
                      {skill}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
