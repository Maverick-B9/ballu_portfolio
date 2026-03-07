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
        { value: '12+', label: 'Technical Events Organized' },
        { value: '2500+', label: 'Students in Live Auction' },
        { value: '300+', label: 'Dev Community Members' },
        { value: '6+', label: 'Real-World Systems Built' },
        { value: 'Top 8', label: 'BIT Hackathon Finalist' },
    ];

    return (
        <section id="impact" className="relative py-24 pb-32 overflow-hidden border-y border-white/5 bg-white/[0.01]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div
                    ref={ref}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#6366F1]/30 transition-all duration-500 hover:translate-y-[-4px]"
                        >
                            <div className="text-3xl font-bold text-white mb-2 leading-none whitespace-nowrap">
                                {stat.value}
                            </div>
                            <div className="text-sm text-[#9CA3AF] leading-snug font-medium">
                                {stat.label}
                            </div>

                            {/* Subtle Glow on Hover */}
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
