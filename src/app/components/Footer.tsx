import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-[#1F1F1F]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-sm mb-1 tracking-tight">
              Balaram B
            </p>
            <p className="text-[#9CA3AF] text-xs font-medium uppercase tracking-[0.2em]">
              Built with Next.js and deployed on Vercel
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Maverick-B9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9CA3AF] hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/balaram-b-022ba031b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9CA3AF] hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[#9CA3AF] text-xs font-medium">
              © 2026 — Built with Precision
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
