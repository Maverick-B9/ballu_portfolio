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

    const achievements = [
        "Organized 12+ technical events and hackathons",
        "Mentored student developers in Git workflows and system architecture",
        "Built a 300+ member developer community",
        "Hosted a live auction event used by 2500 students"
    ];

    return (
        <section id="leadership" className="py-24 bg-[#0A0A0A]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div ref={ref} className="mb-16">
                    <h2 className="text-[34px] font-bold text-white mb-4 tracking-tight">Leadership & Community</h2>
                    <p className="text-[#9CA3AF] text-lg font-medium max-w-2xl">
                        Driving technical excellence and building high-impact developer ecosystems.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="p-10 rounded-[2.5rem] bg-[#151515] border border-[#1F1F1F] hover:border-[#6366F1]/30 transition-all duration-500 group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#6366F1] transition-colors">Secretary — Coding Club</h3>
                                <p className="text-[#6366F1] font-bold text-sm uppercase tracking-widest">Maharaja Institute of Technology Mysore</p>
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                                2023 — Present
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {achievements.map((achievement, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366F1] shrink-0" />
                                    <p className="text-[#9CA3AF] font-medium leading-relaxed">{achievement}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Decorative Gradient */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366F1]/5 blur-[80px] -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
