import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function WhyIBuild() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="why-i-build" className="relative flex items-center justify-center overflow-hidden">
            <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.h2
                        className="text-xs tracking-[0.6em] text-[#4F9DFF] mb-16 opacity-80 text-center"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        WHY I BUILD
                    </motion.h2>

                    <div className="max-w-5xl mx-auto space-y-16">
                        <motion.p
                            className="text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.1] tracking-tight text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            I build software that <span className="text-[#4F9DFF]">solves real-world problems</span>.
                        </motion.p>

                        <motion.div
                            className="max-w-4xl mx-auto space-y-8"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 0.8 }}
                        >
                            <p className="text-2xl md:text-3xl text-white/50 leading-relaxed font-light text-center">
                                From agricultural platforms like Krishi Saathi to investigative tools like <span className="text-white">digital forensic systems</span>, my goal is to create technology that has <span className="text-white italic">real impact</span>.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F9DFF]/5 blur-[160px] -z-10 rounded-full" />
        </section>
    );
}
