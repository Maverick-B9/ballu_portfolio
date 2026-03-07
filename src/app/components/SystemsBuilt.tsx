import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, ExternalLink, Cpu, Shield, Users, Sprout, Briefcase, Globe } from 'lucide-react';

const PROJECTS = [
    {
        title: 'MaaSakhi AI Assistant',
        description: 'AI healthcare platform predicting gestational diabetes risk using machine learning and clinical indicators.',
        tech: ['ML', 'Healthcare', 'Prediction'],
        icon: Shield,
        color: 'from-[#EC4899]/10 to-[#5A4FCF]/10',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Real-Time Auction System',
        description: 'Live sports auction platform deployed during Mahadasara 2025 for 2500+ students with sub-second latency.',
        tech: ['Scale', 'WebSocket', 'Mahadasara'],
        icon: Users,
        color: 'from-[#4F9DFF]/10 to-[#5A4FCF]/10',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Digital Forensic Tool',
        description: 'Forensic analysis platform performing SHA-256 hashing, metadata extraction, and entropy-based anomaly detection.',
        tech: ['Security', 'SHA-256', 'Forensics'],
        icon: Shield,
        color: 'from-[#4F9DFF]/20 to-[#5A4FCF]/20',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Verto',
        description: 'A workflow management system designed to streamline complex digital processes for enterprise scale.',
        tech: ['Flask', 'Enterprise', 'Scalable'],
        icon: Cpu,
        color: 'from-[#F59E0B]/10 to-[#4F9DFF]/10',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Placement Portal',
        description: 'A platform designed to manage student placement activities efficiently with high-scale data modeling.',
        tech: ['Full Stack', 'Database', 'Admin'],
        icon: Briefcase,
        color: 'from-[#6366F1]/10 to-[#4F9DFF]/10',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'IndeAminds Website',
        description: 'A collaborative platform built with GeekWick for digital intelligence and technical community engagement.',
        tech: ['React', 'Collaboration', 'CMS'],
        icon: Globe,
        color: 'from-[#4F9DFF]/10 to-[#5A4FCF]/10',
        github: 'https://github.com/Maverick-B9',
    },
];

export function SystemsBuilt() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-32 text-center"
                >
                    <h2 className="text-xs tracking-[0.8em] text-[#4F9DFF] mb-8 opacity-80 uppercase">
                        SYSTEMS BUILT
                    </h2>
                    <p className="text-white/40 text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                        Transforming complex requirements into high-performance <span className="text-white italic">technical products</span>.
                    </p>
                </motion.div>

                <div ref={ref} className="space-y-32">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 100 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`group relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
                        >
                            {/* Visual Panel */}
                            <div className="w-full md:w-3/5 aspect-video relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000`} />
                                <div className="relative w-full h-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden flex items-center justify-center p-12">
                                    <project.icon className="w-48 h-48 text-[#4F9DFF]/20 group-hover:scale-110 transition-transform duration-1000 rotate-12" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Tech Stack Bubbles */}
                                    <div className="absolute bottom-8 left-8 flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/5 text-[10px] uppercase tracking-widest text-[#4F9DFF] font-bold">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Info Panel */}
                            <div className="w-full md:w-2/5 space-y-8">
                                <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-none group-hover:text-[#4F9DFF] transition-colors duration-500">
                                    {project.title}
                                </h3>
                                <p className="text-white/50 text-xl md:text-2xl leading-relaxed font-light">
                                    {project.description}
                                </p>
                                <div className="pt-4">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all group/btn font-medium"
                                    >
                                        <Github className="w-5 h-5" />
                                        <span>View System Code</span>
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
