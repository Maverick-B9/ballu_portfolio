import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      title: 'Digital Forensic Tool',
      description: 'A system designed to collect, preserve and analyse digital evidence.',
      technologies: ['Python', 'Computer Vision', 'Machine Learning'],
      color: 'from-[#4F9DFF]/20 to-[#5A4FCF]/20',
    },
    {
      title: 'Krishi Saathi',
      description: 'An agricultural assistance platform designed to support farmers with intelligent tools.',
      technologies: ['AI', 'Flask', 'Python'],
      color: 'from-[#5A4FCF]/20 to-[#4F9DFF]/20',
    },
    {
      title: 'Maasakhi',
      description: 'A women-centric safety and support platform using technology.',
      technologies: ['Machine Learning', 'Python', 'MySQL'],
      color: 'from-[#1F3A5F]/20 to-[#4F9DFF]/20',
    },
    {
      title: 'Verto',
      description: 'A digital platform designed to streamline workflows and processes.',
      technologies: ['Flask', 'Python', 'MySQL'],
      color: 'from-[#4F9DFF]/20 to-[#1F3A5F]/20',
    },
    {
      title: 'Live Auction System',
      description: 'Real-time auction management platform used during major college events.',
      technologies: ['Python', 'Flask', 'MySQL'],
      color: 'from-[#5A4FCF]/20 to-[#1F3A5F]/20',
    },
    {
      title: 'Placement Portal',
      description: 'A digital platform designed to manage placement related processes.',
      technologies: ['Flask', 'Python', 'MySQL'],
      color: 'from-[#1F3A5F]/20 to-[#5A4FCF]/20',
    },
    {
      title: 'IndeAminds Website',
      description: 'A collaborative website built with GeekWick.',
      technologies: ['Web Development', 'Collaboration'],
      color: 'from-[#4F9DFF]/20 to-[#5A4FCF]/20',
    },
  ];

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#1A1A1D] to-[#0B0B0F]" />

      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Building intelligent systems and platforms that solve real-world problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#4F9DFF]/50 transition-all">
                {/* Project Visual */}
                <div className={`relative h-48 mb-6 rounded-2xl bg-gradient-to-br ${project.color} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 border-2 border-white/20 rounded-xl"
                      animate={{ rotate: [0, 90, 180, 270, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="text-white text-xl mb-3 group-hover:text-[#4F9DFF] transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all">
                    <Github className="w-4 h-4" />
                    <span className="text-sm">GitHub</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#4F9DFF]/20 hover:bg-[#4F9DFF]/30 border border-[#4F9DFF]/30 text-white transition-all">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Details</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
