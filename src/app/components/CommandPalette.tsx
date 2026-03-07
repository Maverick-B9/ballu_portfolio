import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Search, Terminal, Github, User, FileText, Code } from 'lucide-react';

const ITEMS = [
    { label: 'View Projects', cmd: 'projects', icon: Code },
    { label: 'Download Resume', cmd: 'resume', icon: FileText },
    { label: 'GitHub Profile', cmd: 'github', icon: Github },
    { label: 'Contact Balaram', cmd: 'contact', icon: User },
    { label: 'Launch Terminal', cmd: 'terminal', icon: Terminal },
];

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            } else if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleAction = (cmd: string) => {
        setIsOpen(false);

        if (cmd === 'resume') {
            const link = document.createElement('a');
            link.href = '/Balaram_B_Resume.pdf';
            link.download = 'Balaram_B_Resume.pdf';
            link.click();
            return;
        }

        const idMap: Record<string, string> = {
            projects: 'projects',
            terminal: 'terminal',
            contact: 'contact',
            github: 'activity'
        };

        if (idMap[cmd]) {
            document.getElementById(idMap[cmd])?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const filteredItems = ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-xl mx-4 rounded-2xl bg-[#1A1A1D] border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center px-6 py-4 gap-4 border-b border-white/5">
                            <Search className="w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent outline-none border-none text-white text-lg placeholder:text-white/20"
                            />
                        </div>

                        <div className="p-2 max-h-[60vh] overflow-y-auto">
                            {filteredItems.map((item) => (
                                <button
                                    key={item.cmd}
                                    onClick={() => handleAction(item.cmd)}
                                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all text-left"
                                >
                                    <item.icon className="w-4 h-4 text-[#4F9DFF]" />
                                    <span className="flex-1">{item.label}</span>
                                    <span className="text-[10px] uppercase font-mono tracking-widest opacity-30">ENTER</span>
                                </button>
                            ))}
                            {filteredItems.length === 0 && (
                                <div className="px-6 py-8 text-center text-white/20 text-sm italic">
                                    No system processes found for "{query}"
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                            <div className="flex gap-4">
                                <span className="text-[10px] text-white/30 uppercase tracking-widest">ESC Close</span>
                                <span className="text-[10px] text-white/30 uppercase tracking-widest">Enter Select</span>
                            </div>
                            <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Maverick OS v1.0</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
