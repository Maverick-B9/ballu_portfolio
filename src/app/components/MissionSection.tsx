import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function MissionSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="mission" className="relative min-h-[60vh] flex items-center justify-center py-32 overflow-hidden">
            <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    <motion.h2
                        className="text-xs tracking-[0.6em] text-[#4F9DFF] mb-12 opacity-80"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        MISSION
                    </motion.h2>

                    <motion.p
                        className="text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight max-w-5xl mx-auto tracking-tight mb-12 uppercase italic"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        I design and build <span className="text-[#4F9DFF]">intelligent software systems</span> that transform complex ideas into real-world solutions.
                    </motion.p>

                    <motion.div
                        className="max-w-3xl mx-auto space-y-6"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light">
                            My work spans AI-powered tools, scalable platforms, and community-driven technology initiatives. Every system I build is a step towards engineering excellence.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
