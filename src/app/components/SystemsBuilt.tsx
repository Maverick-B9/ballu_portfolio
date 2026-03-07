import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, ExternalLink, Cpu, Shield, Users, Sprout, Briefcase, Globe } from 'lucide-react';

const PROJECTS = [
    {
        title: 'Digital Forensic Tool',
        description: 'A system designed to collect and analyze digital evidence for investigative workflows.',
        tech: ['Python', 'Computer Vision', 'ML'],
        icon: Shield,
        color: 'from-[#4F9DFF]/20 to-[#5A4FCF]/20',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Krishi Saathi',
        description: 'An agricultural assistance platform designed to empower farmers using technology.',
        tech: ['AI', 'Flask', 'IoT'],
        icon: Sprout,
        color: 'from-[#22C55E]/10 to-[#4F9DFF]/10',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Maasakhi',
        description: 'A digital support platform focused on women’s safety and assistance.',
        tech: ['ML', 'Python', 'Real-time'],
        icon: Shield,
        color: 'from-[#EC4899]/10 to-[#5A4FCF]/10',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Verto',
        description: 'A workflow management system designed to streamline complex digital processes.',
        tech: ['Flask', 'Enterprise', 'Scalable'],
        icon: Cpu,
        color: 'from-[#F59E0B]/10 to-[#4F9DFF]/10',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Live Auction System',
        description: 'A real-time auction platform used in large college events with 2500+ participants.',
        tech: ['Python', 'WebSocket', 'High-Con'],
        icon: Users,
        color: 'from-[#4F9DFF]/10 to-[#5A4FCF]/10',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'Placement Portal',
        description: 'A platform designed to manage student placement activities efficiently.',
        tech: ['Full Stack', 'Database', 'Admin'],
        icon: Briefcase,
        color: 'from-[#6366F1]/10 to-[#4F9DFF]/10',
        github: 'https://github.com/Maverick-B9',
    },
    {
        title: 'IndeAminds Website',
        description: 'A collaborative platform built with GeekWick for digital intelligence.',
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
        <section id="projects" className="relative py-32 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-xs tracking-[0.6em] text-[#4F9DFF] mb-6 opacity-80">
                        SYSTEMS BUILT
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl uppercase tracking-wider">
                        Engineering intelligence into production software
                    </p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${project.color} border border-white/5 hover:border-[#4F9DFF]/30 transition-all duration-700 min-h-[450px] flex flex-col`}
                        >
                            {/* Card Content */}
                            <div className="p-12 relative z-10 flex flex-col h-full">
                                <div className="mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-6">
                                        <project.icon className="w-8 h-8 text-[#4F9DFF]" />
                                    </div>
                                    <h3 className="text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-[#4F9DFF] transition-colors duration-500">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/50 text-xl leading-relaxed max-w-md font-light">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex gap-3">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-[#4F9DFF]/80 font-bold">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-white text-[#0B0B0F] flex items-center justify-center hover:scale-110 transition-transform duration-300"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                                <project.icon className="w-64 h-64 rotate-12" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
