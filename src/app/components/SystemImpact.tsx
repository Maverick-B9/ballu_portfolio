import { motion, animate } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: 2,
                onUpdate: (latest) => setCount(Math.floor(latest)),
            });
            return () => controls.stop();
        }
    }, [isInView, value]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}


export function SystemImpact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        { number: 12, suffix: '+', label: 'Technical Events Organized' },
        { number: 2500, suffix: '+', label: 'Students Engaged' },
        { number: 300, suffix: '+', label: 'Developer Community Members' },
        { number: 7, suffix: '+', label: 'Software Platforms Built' },
    ];

    return (
        <section id="impact" className="relative py-32 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-xs tracking-[0.6em] text-[#4F9DFF] mb-6 opacity-80">
                        SYSTEM IMPACT
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto uppercase tracking-wider">
                        Quantifying the reach of intelligent implementation
                    </p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#4F9DFF]/30 transition-all group"
                        >
                            <div className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tighter group-hover:text-[#4F9DFF] transition-colors duration-500">
                                <Counter value={stat.number} suffix={stat.suffix} />
                            </div>
                            <div className="text-white/40 text-sm uppercase tracking-[0.2em] font-medium leading-relaxed">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
