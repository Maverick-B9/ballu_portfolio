import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar, Building2, Award } from 'lucide-react';

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
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section id="leadership" className="py-24 bg-[#0A0A0A] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-[34px] font-bold text-white mb-4 tracking-tight">Leadership & Community</h2>
                    <p className="text-[#9CA3AF] text-lg font-medium max-w-2xl">
                        Driving technical excellence and building high-impact developer ecosystems.
                    </p>
                </div>

                <div ref={containerRef} className="relative max-w-4xl mx-auto py-12">
                    {/* Vertical Line */}
                    <div className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-px" />

                    {/* Progress Fill */}
                    <motion.div
                        style={{ scaleY: scrollYProgress, originY: 0 }}
                        className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#6366F1] via-[#8B5CF6] to-transparent md:-translate-x-px z-10"
                    />

                    <div className="space-y-24">
                        {MILESTONES.map((milestone, index) => (
                            <TimelineItem key={index} milestone={milestone} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ milestone, index }: { milestone: any, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className={`relative flex items-center justify-between md:justify-normal gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-[45%] p-8 rounded-[2rem] bg-[#151515] border border-[#1F1F1F] hover:border-[#6366F1]/30 transition-all duration-500 group relative"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-[#6366F1]">
                            <Award className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{milestone.period}</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#6366F1] transition-colors">{milestone.role}</h3>
                    <div className="flex items-center gap-2 text-[#9CA3AF] text-xs font-medium uppercase tracking-widest">
                        <Building2 className="w-3.5 h-3.5" />
                        {milestone.organization}
                    </div>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed font-medium mt-2">{milestone.description}</p>
                </div>

                {/* Arrow Decor */}
                <div className={`absolute top-1/2 -translate-y-1/2 hidden md:block w-4 h-px bg-white/5 ${isEven ? '-left-4' : '-right-4'}`} />
            </motion.div>

            {/* Central Dot */}
            <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-20">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    className="w-[42px] h-[42px] rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center p-1"
                >
                    <div className="w-full h-full rounded-full bg-[#151515] flex items-center justify-center text-[#6366F1]">
                        <div className="w-2 h-2 rounded-full bg-[#6366F1] shadow-[0_0_15px_#6366F1]" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
