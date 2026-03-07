import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Trophy, Users, Calendar, Code, Award, TrendingUp } from 'lucide-react';

export function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const achievements = [
    {
      icon: Trophy,
      title: 'Secretary of Stack Forge Coding Club',
      description: 'Leading the technical community and driving innovation',
      metric: 'Leadership',
    },
    {
      icon: Calendar,
      title: 'Organised 12+ Technical Events',
      description: 'Successfully planned and executed large-scale technical events',
      metric: '12+ Events',
    },
    {
      icon: Users,
      title: 'Hosted Auction for 2500+ Students',
      description: 'Managed real-time auction event for massive attendance',
      metric: '2500+ Students',
    },
    {
      icon: Code,
      title: 'Built Multiple Software Systems',
      description: 'Developed and maintained production-level platforms',
      metric: 'Multiple Projects',
    },
    {
      icon: Award,
      title: 'Collaborated with GeekWick',
      description: 'Developed IndeAminds platform with industry partner',
      metric: 'Industry Collab',
    },
    {
      icon: TrendingUp,
      title: 'Mentored 300+ Developers',
      description: 'Built and fostered a thriving technology community',
      metric: '300+ Community',
    },
  ];

  const stats = [
    { number: '12+', label: 'Technical Events' },
    { number: '2500+', label: 'Students Reached' },
    { number: '300+', label: 'Developer Community' },
    { number: '7+', label: 'Major Projects' },
  ];

  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#1F3A5F]/10 to-[#0B0B0F]" />

      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Impact & Achievements
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Driving technical excellence and community growth
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-[#4F9DFF]/10 to-[#5A4FCF]/10 backdrop-blur-sm border border-white/10"
            >
              <div className="text-5xl md:text-6xl text-[#4F9DFF] mb-3">
                {stat.number}
              </div>
              <div className="text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Timeline */}
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group relative"
            >
              <div className="flex items-start gap-6 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#4F9DFF]/50 transition-all">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F9DFF]/20 to-[#5A4FCF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <achievement.icon className="w-7 h-7 text-[#4F9DFF]" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white text-xl group-hover:text-[#4F9DFF] transition-colors">
                      {achievement.title}
                    </h3>
                    <span className="text-[#4F9DFF] text-sm px-3 py-1 rounded-full bg-[#4F9DFF]/10 border border-[#4F9DFF]/30">
                      {achievement.metric}
                    </span>
                  </div>
                  <p className="text-white/60 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Timeline Connector */}
              {index < achievements.length - 1 && (
                <div className="absolute left-14 top-full h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
