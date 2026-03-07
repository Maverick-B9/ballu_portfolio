import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, Star, GitFork, Terminal } from 'lucide-react';

export function GitHubPanel() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Mock repositories based on user request/profile
    const repos = [
        { name: 'Digital-Forensics', stars: 12, forks: 4, lang: 'Python' },
        { name: 'Krishi-Saathi', stars: 24, forks: 8, lang: 'Flask' },
        { name: 'Maasakhi', stars: 15, forks: 3, lang: 'Python' },
        { name: 'Live-Auction-System', stars: 42, forks: 12, lang: 'WebSocket' },
    ];

    return (
        <section id="activity" className="relative py-32 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-xs tracking-[0.6em] text-[#4F9DFF] mb-6 opacity-80">
                        SYSTEM ACTIVITY
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl uppercase tracking-wider">
                        Live telemetry from the development archive
                    </p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* GitHub Header Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-1 p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-20 h-20 rounded-2xl bg-[#4F9DFF] flex items-center justify-center mb-8">
                                <Github className="w-10 h-10 text-[#0B0B0F]" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">MAVERICK-B9</h3>
                            <p className="text-white/40 font-light leading-relaxed mb-8">
                                Persistent exploration of intelligent systems and scalable architecture. Track real-time repository updates and system commits.
                            </p>
                        </div>
                        <a
                            href="https://github.com/Maverick-B9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-[#4F9DFF] hover:gap-5 transition-all duration-300 font-mono text-xs tracking-widest uppercase"
                        >
                            Access Profile <Terminal className="w-4 h-4" />
                        </a>
                    </motion.div>

                    {/* Repo Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {repos.map((repo, index) => (
                            <motion.div
                                key={repo.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#4F9DFF]/30 transition-all group"
                            >
                                <h4 className="text-lg font-bold text-white mb-4 group-hover:text-[#4F9DFF] transition-colors">{repo.name}</h4>
                                <div className="flex items-center gap-6 text-white/40 text-xs font-mono">
                                    <span className="flex items-center gap-1.5"><Star className="w-3 h-3 text-[#4F9DFF]" /> {repo.stars}</span>
                                    <span className="flex items-center gap-1.5"><GitFork className="w-3 h-3 text-[#4F9DFF]" /> {repo.forks}</span>
                                    <span className="ml-auto px-3 py-1 bg-white/5 rounded-full text-[#4F9DFF]">{repo.lang}</span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Activity Chart Simulation Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="col-span-full h-32 rounded-3xl bg-white/[0.01] border border-white/5 p-6 flex items-end gap-1"
                        >
                            {[...Array(40)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 bg-[#4F9DFF]/20 rounded-sm"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.random() * 80 + 20}%` }}
                                    transition={{ duration: 1, delay: 1 + i * 0.02 }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
