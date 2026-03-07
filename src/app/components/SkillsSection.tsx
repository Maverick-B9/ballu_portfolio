import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const SKILLS = [
    {
        category: 'Languages',
        items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C'],
    },
    {
        category: 'Backend',
        items: ['Node.js', 'Express.js', 'Flask', 'REST APIs'],
    },
    {
        category: 'Frontend',
        items: ['React', 'Next.js'],
    },
    {
        category: 'AI / ML',
        items: ['TensorFlow', 'PyTorch', 'Scikit-learn'],
    },
    {
        category: 'Infrastructure',
        items: ['Linux', 'NGINX', 'Git', 'Postman'],
    },
    {
        category: 'Databases',
        items: ['MySQL', 'SQLite'],
    },
];

export function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="py-24 bg-[#0A0A0A]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div ref={ref} className="mb-16">
                    <h2 className="text-[34px] font-bold text-white mb-4 tracking-tight">Engineering Skills</h2>
                    <p className="text-[#9CA3AF] text-lg font-medium max-w-2xl">
                        A specialized toolkit for building intelligent, scalable, and high-performance software systems.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {SKILLS.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="p-8 rounded-[2.5rem] bg-[#151515] border border-[#1F1F1F] hover:border-[#6366F1]/30 transition-all duration-500 group"
                        >
                            <h3 className="text-sm font-bold text-[#6366F1] uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-4">
                                {skill.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-[#9CA3AF] font-medium group-hover:text-white group-hover:bg-[#6366F1]/10 transition-all duration-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
