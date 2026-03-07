import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const SKILLS = [
    {
        category: 'Languages',
        items: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
        category: 'AI & Machine Learning',
        items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Computer Vision', 'Gemini AI', 'YOLO'],
    },
    {
        category: 'Backend Engineering',
        items: ['Node.js', 'Flask', 'Django', 'Express'],
    },
    {
        category: 'Frontend Development',
        items: ['React', 'Next.js', 'Tailwind CSS'],
    },
    {
        category: 'Infrastructure',
        items: ['AWS (EC2, S3)', 'Git', 'Docker', 'CI/CD'],
    },
    {
        category: 'Databases',
        items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Redis'],
    },
];

export function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="relative py-24 bg-white/[0.01] border-y border-white/5">
            <div className="max-w-[1200px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Technical Stack
                    </h2>
                    <p className="text-[#9CA3AF] text-lg max-w-2xl font-medium">
                        A specialized toolkit for building intelligent, scalable, and high-performance software systems.
                    </p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SKILLS.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="p-8 rounded-3xl bg-[#111111] border border-white/5 hover:border-[#6366F1]/30 transition-all duration-500 group"
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
