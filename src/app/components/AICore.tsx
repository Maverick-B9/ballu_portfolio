import { motion } from 'motion/react';

export function AICore() {
    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
            {/* Outer Glow */}
            <motion.div
                className="absolute inset-0 rounded-full bg-[#4F9DFF]/20 blur-[60px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Rotating Nodes & Connections Simulation */}
            <motion.div
                className="relative w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#4F9DFF]/10 to-transparent"
                        style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg)` }}
                    />
                ))}

                {[...Array(16)].map((_, i) => {
                    const angle = (i * 22.5) * (Math.PI / 180);
                    const radius = i % 2 === 0 ? 40 : 30; // % of container
                    return (
                        <motion.div
                            key={`node-${i}`}
                            className="absolute w-1 h-1 bg-[#4F9DFF]/60 rounded-full shadow-[0_0_4px_rgba(79,157,255,0.4)]"
                            style={{
                                left: `${50 + radius * Math.cos(angle)}%`,
                                top: `${50 + radius * Math.sin(angle)}%`,
                            }}
                            animate={{
                                opacity: [0.2, 0.5, 0.2],
                                scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    );
                })}
            </motion.div>

            {/* Central Core */}
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#4F9DFF] to-[#5A4FCF] blur-2xl opacity-10" />
            <motion.div
                className="absolute w-4 h-4 rounded-full bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />

        </div>
    );
}
