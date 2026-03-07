import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, Star, GitFork, ExternalLink, Box } from 'lucide-react';

interface Repo {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    html_url: string;
}

export function GitHubExplorer() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        fetch('https://api.github.com/users/Maverick-B9/repos?sort=updated&per_page=6')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRepos(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch repos:', err);
                setLoading(false);
            });
    }, []);

    return (
        <section className="py-24 bg-[#0A0A0A]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div ref={ref} className="mb-16">
                    <h2 className="text-[34px] font-bold text-white mb-4 tracking-tight">GitHub Project Explorer</h2>
                    <p className="text-[#9CA3AF] text-lg font-medium max-w-2xl">
                        Real-time feed of my latest open-source contributions and active developments.
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-[#6366F1]/20 border-t-[#6366F1] rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo, index) => (
                            <motion.a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="p-6 rounded-3xl bg-[#151515] border border-[#1F1F1F] hover:border-[#6366F1]/50 transition-all group flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-[#9CA3AF] group-hover:text-white transition-colors">
                                        <Box className="w-5 h-5" />
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-[#9CA3AF] group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#6366F1] transition-colors truncate">
                                    {repo.name}
                                </h3>

                                <p className="text-[#9CA3AF] text-sm font-medium leading-relaxed mb-6 line-clamp-2 flex-1">
                                    {repo.description || "Experimental system architecture and development."}
                                </p>

                                <div className="flex items-center gap-6 mt-auto">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
                                        <Star className="w-3 h-3 text-yellow-500/80" />
                                        {repo.stargazers_count}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
                                        <GitFork className="w-3 h-3 text-blue-500/80" />
                                        {repo.forks_count}
                                    </div>
                                    {repo.language && (
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 uppercase tracking-widest ml-auto">
                                            <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                                            {repo.language}
                                        </div>
                                    )}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
