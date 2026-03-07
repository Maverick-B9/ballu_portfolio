import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const SKILLS = [
    {
        category: 'Languages',
        items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C'],
    },
    {
        category: 'Web Technologies',
        items: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind'],
    },
    {
        category: 'Backend',
        items: ['Node.js', 'Express.js', 'Flask'],
    },
    {
        category: 'Machine Learning',
        items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'YOLOv8'],
    },
    {
        category: 'Tools',
        items: ['Git', 'Linux', 'NGINX', 'Postman'],
    },
];

export function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="relative py-32 overflow-hidden bg-white/[0.01]">
            <div className="max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-xs tracking-[0.8em] text-[#4F9DFF] mb-6 opacity-80 uppercase">
                        TECHNICAL STACK
                    </h2>
                    <p className="text-white/40 text-2xl font-light">
                        Specialized gear for <span className="text-white italic">intelligent system architecture</span>.
                    </p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {SKILLS.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="space-y-6"
                        >
                            <h3 className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase border-b border-white/5 pb-4">
                                {skill.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item) => (
                                    <span key={item} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white/60 hover:text-white hover:border-[#4F9DFF]/30 transition-all cursor-default">
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
