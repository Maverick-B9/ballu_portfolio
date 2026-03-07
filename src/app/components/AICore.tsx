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
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4F9DFF]/40 to-transparent"
                        style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
                    />
                ))}

                {[...Array(24)].map((_, i) => {
                    const angle = (i * 15) * (Math.PI / 180);
                    const radius = i % 2 === 0 ? 45 : 35; // % of container
                    return (
                        <motion.div
                            key={`node-${i}`}
                            className="absolute w-1 h-1 bg-[#4F9DFF] rounded-full shadow-[0_0_8px_#4F9DFF]"
                            style={{
                                left: `${50 + radius * Math.cos(angle)}%`,
                                top: `${50 + radius * Math.sin(angle)}%`,
                            }}
                            animate={{
                                opacity: [0.4, 1, 0.4],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    );
                })}
            </motion.div>

            {/* Central Core */}
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#4F9DFF] to-[#5A4FCF] blur-md opacity-20" />
            <motion.div
                className="absolute w-8 h-8 rounded-full bg-white shadow-[0_0_20px_#fff]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </div>
    );
}
