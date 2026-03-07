import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const MILESTONES = [
    {
        role: 'Secretary',
        organization: 'Stack Forge Coding Club',
        description: 'Leading the flagship technical community at MITM. Overseeing 12+ large-scale events and driving technical excellence across the student body.',
        period: '2024 - Present',
    },
    {
        role: 'Event Organizer',
        organization: 'Technical Events & Workshops',
        description: 'Successfully planned and executed 12+ major technical workshops and competitions reaching 2500+ total student participants.',
        period: '2023 - 2024',
    },
    {
        role: 'Community Builder',
        organization: 'Student Developer Ecosystem',
        description: 'Built and mentored a vibrant community of 300+ student developers, fostering collaboration on real-world software projects.',
        period: '2023 - Present',
    },
    {
        role: 'Technical Lead',
        organization: 'Mahadasara Live Auction',
        description: 'Architected and hosted a real-time sports auction platform for 2500+ concurrent users with sub-second WebSocket latency.',
        period: '2024',
    },
];

export function LeadershipTimeline() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="leadership" className="relative py-24">
            <div className="max-w-[1200px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Leadership & Community
                    </h2>
                    <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto font-medium">
                        Building ecosystems, mentoring developers, and organizing large-scale technical experiences.
                    </p>
                </motion.div>

                <div
                    ref={ref}
                    className="relative max-w-3xl mx-auto pl-8 md:pl-0"
                >
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5" />

                    <div className="space-y-16">
                        {MILESTONES.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Node */}
                                <div className="absolute left-[-4px] md:left-1/2 md:translate-x-[-50%] top-0 md:top-8 w-2 h-2 rounded-full bg-[#6366F1] shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10" />

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                                    }`}>
                                    <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#6366F1]/30 transition-all duration-500 group">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[#6366F1] text-xs font-bold uppercase tracking-widest">
                                                {item.period}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#6366F1] transition-colors">
                                            {item.role}
                                        </h3>
                                        <div className="text-sm text-[#9CA3AF] mb-4 font-medium italic">
                                            {item.organization}
                                        </div>
                                        <p className="text-[#9CA3AF] leading-relaxed text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Spacer for 1-column logic on desktop */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
