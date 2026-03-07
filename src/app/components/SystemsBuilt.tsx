import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Github, ExternalLink, Code2, X, Cpu, Target, Braces } from 'lucide-react';

const projects = [
    {
        title: "Real-Time Auction Management System",
        description: "Real-time sports auction platform built for Mahadasara 2025 enabling live bidding and purse management for 2500+ students.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/Maverick-B9",
        demo: "#",
        featured: true,
        caseStudy: {
            problem: "Managing high-concurrency bidding for thousands of students during live physical auctions where speed and accuracy are critical.",
            challenges: "Implementing real-time state synchronization across distributed clients while maintaining a high-performance, low-latency purse management system.",
            architecture: "Next.js App Router for frontend/backend integration, custom state-sync logic for real-time bid propagation, and a secure ledger for virtual currency management.",
            stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel"]
        }
    },
    {
        title: "Digital Forensic Investigation Tool",
        description: "Secure forensic analysis platform performing SHA-256 hashing, metadata extraction, and entropy analysis to automate evidence investigation.",
        tech: ["Python", "Flask", "Cryptography", "SQLite"],
        github: "https://github.com/Maverick-B9",
        demo: "#",
        caseStudy: {
            problem: "Digital forensic investigators needed a lightweight, secure tool to perform initial triage on evidence files without altering timestamps or metadata.",
            challenges: "Optimizing entropy analysis for large binary files and ensuring cryptographic integrity (SHA-256) of all processed artifacts.",
            architecture: "Python-based backend for heavy computation, multi-threaded hashing system, and a strictly isolated SQLite ledger for chain of custody.",
            stack: ["Python 3.10", "Flask", "PyPDF2", "Cryptography.io"]
        }
    },
    {
        title: "Verto — AI Quiz Generator",
        description: "AI-powered quiz generation platform using Gemini AI to convert documents into structured assessments.",
        tech: ["Node.js", "React", "TypeScript", "Google Gemini API"],
        github: "https://github.com/Maverick-B9",
        demo: "#",
        caseStudy: {
            problem: "Automating the creation of educational assessments from unstructured PDF or text documents.",
            challenges: "Refining prompt engineering for LLMs to generate high-accuracy questions with correct distractor logic and proper classification.",
            architecture: "Node.js API gateway, Google Gemini 1.5 Pro integration, and a React-based interactive teacher dashboard for quiz validation.",
            stack: ["Next.js", "TypeScript", "Gemini SDK", "Prisma"]
        }
    },
    {
        title: "Krishi Sarathi",
        description: "AI-powered agriculture assistant with crop disease detection and agricultural insights for farmers.",
        tech: ["Python", "TensorFlow", "React Native", "Flask"],
        github: "https://github.com/Maverick-B9",
        demo: "#",
        caseStudy: {
            problem: "Providing accessible, real-time crop disease diagnosis for farmers in low-connectivity rural environments.",
            challenges: "Training EfficientNet models on limited diseased-leaf datasets and deploying them efficiently via a mobile backend.",
            architecture: "Mobile-first React Native frontend, Flask inference API, and a custom-trained TensorFlow model for 20+ crop diseases.",
            stack: ["TensorFlow", "React Native", "Flask", "AWS S3"]
        }
    },
    {
        title: "MaaSakhi",
        description: "AI maternal health assistant predicting gestational diabetes risk using machine learning.",
        tech: ["Python", "Scikit-Learn", "Flask", "React"],
        github: "https://github.com/Maverick-B9",
        demo: "#",
        caseStudy: {
            problem: "Early identification of gestational diabetes risk in expectant mothers with limited access to specialized clinics.",
            challenges: "Balancing model sensitivity and specificity on sensitive healthcare data to minimize false negatives.",
            architecture: "Scikit-Learn pipeline for predictive modeling, Flask rest API, and a privacy-focused React dashboard for health tracking.",
            stack: ["Scikit-Learn", "Pandas", "Flask", "Material UI"]
        }
    }
];

function ProjectModal({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl bg-[#151515] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8 md:p-12">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1]">
                                    <Code2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tag: string, i: number) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4 text-[#6366F1]">
                                            <Target className="w-5 h-5" />
                                            <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Problem Solved</h4>
                                        </div>
                                        <p className="text-[#9CA3AF] leading-relaxed font-medium">{project.caseStudy.problem}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-4 text-[#8B5CF6]">
                                            <Cpu className="w-5 h-5" />
                                            <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Key Challenges</h4>
                                        </div>
                                        <p className="text-[#9CA3AF] leading-relaxed font-medium">{project.caseStudy.challenges}</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4 text-[#6366F1]">
                                            <Braces className="w-5 h-5" />
                                            <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Architecture</h4>
                                        </div>
                                        <p className="text-[#9CA3AF] leading-relaxed font-medium">{project.caseStudy.architecture}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-4">Core Stack</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {project.caseStudy.stack.map((item: string, i: number) => (
                                                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-[#9CA3AF] font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-[#6366F1]" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-4">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-[#6366F1] text-white font-bold rounded-2xl hover:bg-[#4F46E5] transition-all flex items-center gap-2"
                                >
                                    <Github className="w-5 h-5" />
                                    View Repository
                                </a>
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export function SystemsBuilt() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [selectedProject, setSelectedProject] = useState<any>(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject]);

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
                            className={`group relative p-8 rounded-[2.5rem] bg-[#151515] border border-[#1F1F1F] hover:border-[#6366F1]/40 transition-all duration-500 flex flex-col items-start ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
                        >
                            <div className="flex-1 w-full relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] group-hover:scale-110 group-hover:bg-[#6366F1]/20 transition-all duration-500">
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-4">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#6366F1] transition-colors duration-500">{project.title}</h3>
                                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-8 font-medium opacity-80 group-hover:opacity-100 transition-opacity">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest group-hover:border-[#6366F1]/20 transition-colors">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/5 mb-6" />

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedProject(project)}
                                className="text-[10px] font-bold text-[#6366F1] uppercase tracking-[0.2em] flex items-center gap-2 group/btn relative overflow-hidden"
                            >
                                <span className="relative z-10">View Case Study</span>
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="relative z-10"
                                >
                                    →
                                </motion.span>
                            </motion.button>

                            {/* Hover Spotlight */}
                            <div className="absolute inset-0 bg-radial-gradient from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
