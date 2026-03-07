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

    const metrics = [
        { label: 'Technical Events Organized', value: '12+', detail: 'Hackathons & Workshops' },
        { label: 'Live Auction Participants', value: '2500+', detail: 'Large-scale student events' },
        { label: 'Dev Community Members', value: '300+', detail: 'Student Developer Network' },
        { label: 'Production Systems Built', value: '6+', detail: 'Real-world software impact' },
        { label: 'Hackathon Finalist', value: 'Top 8', detail: 'Out of 900 teams' },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.04] hover:border-[#6366F1]/30 transition-all group"
                        >
                            <div className="text-3xl font-bold text-white mb-2 tracking-tighter group-hover:text-[#6366F1] transition-colors">
                                {metric.value}
                            </div>
                            <div className="text-[10px] font-bold text-[#6366F1] uppercase tracking-[0.2em] mb-1">
                                {metric.label}
                            </div>
                            <div className="text-xs text-[#9CA3AF] font-medium leading-relaxed">
                                {metric.detail}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
