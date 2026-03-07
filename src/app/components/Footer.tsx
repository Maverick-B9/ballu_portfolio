import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="absolute inset-0 bg-[#0B0B0F]" />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-white/90 mb-1">
              © Balaram B — Engineering Intelligence into Machines.
            </p>
            <p className="text-white/40 text-sm">
              Building the future, one system at a time.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Maverick-B9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#4F9DFF]/50 flex items-center justify-center transition-all group"
            >
              <Github className="w-5 h-5 text-white/70 group-hover:text-[#4F9DFF] transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/balaram-b-022ba031b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#4F9DFF]/50 flex items-center justify-center transition-all group"
            >
              <Linkedin className="w-5 h-5 text-white/70 group-hover:text-[#4F9DFF] transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
