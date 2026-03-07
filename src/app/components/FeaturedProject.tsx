import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, ExternalLink, Cpu, Shield, Sprout, BrainCircuit } from 'lucide-react';

export function FeaturedProject() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="featured" className="relative py-32 overflow-hidden bg-white/[0.01]">
            <div className="max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <h2 className="text-xs tracking-[0.8em] text-[#4F9DFF] mb-8 opacity-80 uppercase">
                        FEATURED SYSTEM
                    </h2>
                </motion.div>

                <div ref={ref} className="group relative">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-[#4F9DFF]/5 blur-[120px] rounded-[4rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="glass-card p-12 md:p-20 overflow-hidden relative">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            {/* Left: Info */}
                            <div className="flex-1 space-y-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-[#4F9DFF]">
                                        <BrainCircuit className="w-6 h-6" />
                                        <span className="text-sm font-mono tracking-widest uppercase">Machine Learning System</span>
                                    </div>
                                    <h3 className="text-6xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                                        KRISHI SARATHI <br /> <span className="text-white/40 italic">AI PLATFORM</span>
                                    </h3>
                                </div>

                                <p className="text-2xl text-white/60 leading-relaxed font-light">
                                    Agricultural intelligence system using machine learning and computer vision to empower modern farming protocols.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        'Trained EfficientNet-B0 on 32,000 crop images',
                                        'Achieved 90.7% disease classification accuracy',
                                        'Implemented YOLOv8 wildlife detection system',
                                        'Automated crop protection alerts for farmers'
                                    ].map((highlight, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#4F9DFF] mt-2 link_anchor" />
                                            <span className="text-white/40 text-sm leading-relaxed">{highlight}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {['Python', 'TensorFlow', 'YOLOv8', 'Flask', 'CV2'].map((tech) => (
                                        <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-widest text-[#4F9DFF] font-bold">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-6 pt-4">
                                    <button className="px-10 py-5 bg-[#4F9DFF] text-[#0B0B0F] rounded-full hover:bg-white transition-all font-bold flex items-center gap-3">
                                        <span>View Project</span>
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                    <button className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-full hover:bg-white/10 transition-all font-bold flex items-center gap-3">
                                        <Github className="w-5 h-5" />
                                        <span>GitHub</span>
                                    </button>
                                </div>
                            </div>

                            {/* Right: Visual */}
                            <div className="w-full lg:w-2/5 aspect-square relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#4F9DFF]/20 to-transparent blur-[80px]" />
                                <div className="relative w-full h-full bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center p-12 overflow-hidden">
                                    <Sprout className="w-48 h-48 text-[#4F9DFF]/20 animate-pulse" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

                                    {/* Simulated ML Grid */}
                                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
                                        {[...Array(36)].map((_, i) => (
                                            <div key={i} className="border-[0.5px] border-white/20" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
