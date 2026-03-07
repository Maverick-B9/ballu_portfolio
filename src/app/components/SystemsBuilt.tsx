import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const projects = [
    {
        title: "Real-Time Auction Management System",
        description: "Real-time sports auction platform built for Mahadasara 2025 enabling live bidding and purse management for 2500+ students.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/Maverick-B9",
        demo: "#",
        featured: true
    },
    {
        title: "Digital Forensic Investigation Tool",
        description: "Secure forensic analysis platform performing SHA-256 hashing, metadata extraction, and entropy analysis to automate evidence investigation.",
        tech: ["Python", "Flask", "Cryptography", "SQLite"],
        github: "https://github.com/Maverick-B9",
        demo: "#"
    },
    {
        title: "Verto — AI Quiz Generator",
        description: "AI-powered quiz generation platform using Gemini AI to convert documents into structured assessments.",
        tech: ["Node.js", "React", "TypeScript", "Google Gemini API"],
        github: "https://github.com/Maverick-B9",
        demo: "#"
    },
    {
        title: "Krishi Sarathi",
        description: "AI-powered agriculture assistant with crop disease detection and agricultural insights for farmers.",
        tech: ["Python", "TensorFlow", "React Native", "Flask"],
        github: "https://github.com/Maverick-B9",
        demo: "#"
    },
    {
        title: "MaaSakhi",
        description: "AI maternal health assistant predicting gestational diabetes risk using machine learning.",
        tech: ["Python", "Scikit-Learn", "Flask", "React"],
        github: "https://github.com/Maverick-B9",
        demo: "#"
    }
];

export function SystemsBuilt() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="py-24 bg-[#0A0A0A]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div ref={ref} className="mb-16">
                    <h2 className="text-[34px] font-bold text-white mb-4 tracking-tight">Featured Systems</h2>
                    <p className="text-[#9CA3AF] text-lg font-medium max-w-2xl">
                        A collection of production-ready systems engineered for security, scale, and real-world impact.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`group relative p-8 rounded-[2.5rem] bg-[#151515] border border-[#1F1F1F] hover:border-[#6366F1]/50 transition-all duration-500 flex flex-col items-start ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
                        >
                            <div className="flex-1 w-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] group-hover:scale-110 transition-transform">
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-4">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-white transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-white transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#6366F1] transition-colors">{project.title}</h3>
                                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-8 font-medium">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-bold text-white/50 uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/5 mb-6" />

                            <button className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 group/btn">
                                View Case Study
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
