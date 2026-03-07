import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const MESSAGES = [
    'INITIALIZING SYSTEM',
    'LOADING PORTFOLIO DATABASE',
    'CONNECTING PROJECT ARCHIVE',
    'LAUNCHING BALARAM AI',
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
    const [currentMsg, setCurrentMsg] = useState(0);

    useEffect(() => {
        if (currentMsg < MESSAGES.length) {
            const timer = setTimeout(() => {
                setCurrentMsg((prev) => prev + 1);
            }, 600);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(onComplete, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentMsg, onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-[#0B0B0F] flex items-center justify-center font-mono">
            <div className="max-w-md w-full px-8">
                <div className="space-y-2">
                    {MESSAGES.slice(0, currentMsg + 1).map((msg, i) => (
                        <motion.div
                            key={msg}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <span className="text-[#4F9DFF] opacity-50">{">"}</span>
                            <span className={`text-xs tracking-[0.2em] font-medium ${i === currentMsg ? 'text-white' : 'text-white/40'}`}>
                                {msg}
                                {i === currentMsg && i < MESSAGES.length && <span className="animate-pulse ml-1">_</span>}
                            </span>
                            {i < currentMsg && (
                                <span className="text-[#4F9DFF] text-[10px] ml-auto">DONE</span>
                            )}
                        </motion.div>
                    ))}
                </div>

                {currentMsg === MESSAGES.length && (
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="h-[1px] bg-gradient-to-r from-transparent via-[#4F9DFF] to-transparent mt-8 origin-center"
                    />
                )}
            </div>
        </div>
    );
}
