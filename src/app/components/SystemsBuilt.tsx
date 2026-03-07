import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, ExternalLink, Cpu, Shield, Users, Sprout, Briefcase, Globe } from 'lucide-react';

const PROJECTS = [
    {
        title: 'Digital Forensic Tool',
        description: 'Automated forensic evidence analysis platform with hashing, metadata extraction, and entropy detection.',
        tech: ['Python', 'Security', 'SHA-256'],
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Verto — AI Quiz Generator',
        description: 'AI-powered quiz platform generating questions from uploaded documents using Gemini AI.',
        tech: ['Gemini AI', 'Node.js', 'React'],
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Real-Time Auction System',
        description: 'Sports auction platform used live for 2500+ students during Mahadasara with sub-second latency.',
        tech: ['WebSockets', 'Node.js', 'Scale'],
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Krishi Sarathi',
        description: 'AI agriculture platform with crop disease detection and automated agricultural insights.',
        tech: ['ML', 'Computer Vision', 'YOLOv8'],
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'MaaSakhi',
        description: 'AI maternal health assistant predicting clinical risks and gestational diabetes.',
        tech: ['ML', 'Healthcare', 'Prediction'],
        github: 'https://github.com/Maverick-B9',
    },
];

export function SystemsBuilt() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="relative py-24">
            <div className="max-w-[1200px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Selected Projects
                    </h2>
                    <p className="text-[#9CA3AF] text-lg max-w-2xl font-medium">
                        Engineering real-world systems with a focus on AI, scalability, and technical impact.
                    </p>
                </motion.div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative h-full flex flex-col p-8 rounded-3xl bg-[#111111] border border-white/5 hover:border-[#6366F1]/40 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#6366F1] transition-colors duration-500">
                                {project.title}
                            </h3>

                            <p className="text-[#9CA3AF] text-base leading-relaxed mb-8 flex-1">
                                {project.description}
                            </p>

                            <div className="space-y-8">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-widest text-[#9CA3AF] font-bold">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                                    <button className="text-sm font-semibold text-white hover:text-[#6366F1] transition-colors flex items-center gap-2">
                                        View Details
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-[#9CA3AF] hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
