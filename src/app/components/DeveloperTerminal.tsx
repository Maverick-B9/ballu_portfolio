import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const COMMANDS: Record<string, string> = {
    whois: "Balaram B is a Computer Science Engineer focused on AI, ML, and scalable software systems.",
    projects: "Systems Built: Digital Forensic Tool, Krishi Saathi, Maasakhi, Verto, Live Auction System, Placement Portal, IndeAminds.",
    skills: "Core Intelligence: Python, Java, C, Machine Learning, Computer Vision, AI, Flask, TensorFlow, MySQL.",
    contact: "Telemetry: ballubalaram2003@gmail.com | +91 9449114920",
    github: "Accessing Archive: https://github.com/Maverick-B9",
    clear: "SYSTEM_CLEAR",
    help: "Available commands: whois, projects, skills, contact, github, clear, help"
};

export function DeveloperTerminal() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>(['Welcome to Balaram AI Console. Type "help" for available commands.']);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.toLowerCase().trim();
        if (!cmd) return;

        if (cmd === 'clear') {
            setHistory([]);
        } else if (COMMANDS[cmd]) {
            setHistory(prev => [...prev, `> ${cmd}`, COMMANDS[cmd]]);
        } else {
            setHistory(prev => [...prev, `> ${cmd}`, `Error: System command "${cmd}" not recognized. Type "help".`]);
        }
        setInput('');
    };

    return (
        <section id="terminal" className="relative py-32 overflow-hidden bg-black/40">
            <div className="max-w-[1440px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                    {/* Terminal Header */}
                    <div className="bg-white/5 px-6 py-4 flex items-center gap-3 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="ml-4 flex items-center gap-2 text-white/40 font-mono text-xs uppercase tracking-widest">
                            <TerminalIcon className="w-3 h-3" />
                            balaram_ai_console — -zsh
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div
                        ref={scrollRef}
                        className="bg-[#0B0B0F]/90 h-[400px] p-8 font-mono text-sm overflow-y-auto space-y-2 custom-scrollbar"
                    >
                        {history.map((line, i) => (
                            <div key={i} className={line.startsWith('>') ? 'text-[#4F9DFF]' : 'text-white/60'}>
                                {line}
                            </div>
                        ))}
                        <form onSubmit={handleCommand} className="flex items-center gap-3 text-[#4F9DFF]">
                            <span>{">"}</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent outline-none border-none p-0 text-white placeholder:text-white/20"
                                spellCheck={false}
                            />
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
