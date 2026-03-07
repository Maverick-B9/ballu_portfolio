import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const MILESTONES = [
    {
        title: 'Secretary of Stack Forge Coding Club',
        description: 'Leading the technical community and driving innovation at MITM.',
        year: '2024 - Present',
    },
    {
        title: 'Organized 12+ Technical Events',
        description: 'Successfully planned and executed large-scale technical workshops and competitions.',
        year: '2023 - 2024',
    },
    {
        title: 'Hosted an Auction for 2500+ Students',
        description: 'Managed real-time auction platform architecture for massive concurrent attendance.',
        year: '2024',
    },
    {
        title: 'Built a Developer Community of 300+ Students',
        description: 'Mentoring and fostering a vibrant technology ecosystem for modern developers.',
        year: '2023 - Present',
    },
    {
        title: 'Collaborated with GeekWick on IndeAminds',
        description: 'Engineered the IndeAminds platform through strategic industry partnership.',
        year: '2024',
    },
    {
        title: 'Earned Multiple Technical Certifications',
        description: 'Validated expertise through industry-standard AI and Software Engineering protocols.',
        year: 'Ongoing',
    },
];

export function LeadershipTimeline() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="leadership" className="relative py-32 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center"
                >
                    <h2 className="text-xs tracking-[0.8em] text-[#4F9DFF] mb-6 opacity-80 uppercase">
                        LEADERSHIP & COMMUNITY
                    </h2>
                    <p className="text-white/40 text-2xl font-light">
                        Driving <span className="text-white italic">innovation</span> through group intelligence.
                    </p>
                </motion.div>

                <div ref={ref} className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white/10 hidden md:block" />

                    <div className="space-y-24">
                        {MILESTONES.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Content Card */}
                                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-[#4F9DFF]/30 transition-all duration-500">
                                        <span className="text-[#4F9DFF] text-xs font-mono mb-2 block tracking-widest">{milestone.year}</span>
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#4F9DFF] transition-colors">{milestone.title}</h3>
                                        <p className="text-white/40 leading-relaxed font-light">{milestone.description}</p>
                                    </div>
                                </div>

                                {/* Node */}
                                <div className="relative z-10">
                                    <motion.div
                                        className="w-4 h-4 rounded-full bg-white border-2 border-[#4F9DFF] shadow-[0_0_10px_#4F9DFF]"
                                        whileHover={{ scale: 1.5 }}
                                    />
                                </div>

                                {/* Spacer for 1-column logic */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
