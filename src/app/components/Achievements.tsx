import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, Trophy, Star } from 'lucide-react';

const ACHIEVEMENTS = [
    {
        title: 'Hackathon Finalist — BIT 2025',
        result: 'Top 8 of 900+ teams',
        description: 'Recognized for engineering a high-impact solution among intense national competition.',
        icon: Trophy,
    },
    {
        title: '2nd Place — Teckshetra Hackathon 2025',
        result: 'Runner Up',
        description: 'Awarded for technical excellence and innovative system architecture.',
        icon: Award,
    },
    {
        title: '5th Place — Bahubali College Hackathon 2024',
        result: 'Top Tier Distinction',
        description: 'Demonstrated rapid prototyping and problem-solving in a 24-hour sprint.',
        icon: Star,
    },
];

export function Achievements() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="achievements" className="relative py-32 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-xs tracking-[0.8em] text-[#4F9DFF] mb-6 opacity-80 uppercase">
                        ACHIEVEMENTS
                    </h2>
                    <p className="text-white/40 text-2xl font-light">
                        Recognized for <span className="text-white italic">technical excellence</span> and high-speed innovation.
                    </p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ACHIEVEMENTS.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="glass-card p-10 group hover:border-[#4F9DFF]/30 transition-all duration-500"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#4F9DFF]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <item.icon className="w-6 h-6 text-[#4F9DFF]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                            <div className="text-[#4F9DFF] text-xs font-mono mb-4 tracking-widest uppercase">{item.result}</div>
                            <p className="text-white/40 font-light leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
