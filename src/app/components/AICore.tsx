import { motion } from 'motion/react';

export function AICore() {
    return (
        <div className="relative w-72 h-72 md:w-[500px] md:h-[500px] flex items-center justify-center">
            {/* Soft Ambient Glow */}
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6366F1]/20 via-[#8B5CF6]/10 to-transparent blur-[80px]"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* The Sphere Body */}
            <motion.div
                className="relative w-48 h-48 md:w-80 md:h-80 rounded-full border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl shadow-2xl overflow-hidden"
                animate={{
                    rotate: 360,
                    y: [0, -10, 0]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                }}
            >
                {/* Internal Refraction Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />

                {/* Moving Nodes */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const radius = 35 + Math.random() * 10;
                    return (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#6366F1]/40 rounded-full"
                            style={{
                                left: `${50 + radius * Math.cos(angle)}%`,
                                top: `${50 + radius * Math.sin(angle)}%`,
                            }}
                            animate={{
                                opacity: [0.2, 0.6, 0.2],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    );
                })}
            </motion.div>

            {/* Outer Ring */}
            <motion.div
                className="absolute w-64 h-64 md:w-[420px] md:h-[420px] rounded-full border border-white/[0.02]"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}
