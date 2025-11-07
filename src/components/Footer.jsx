import { Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} Curriculo. Crafted for curious CS undergrads.</p>
        <div className="flex items-center gap-4 text-slate-600">
          <a className="flex items-center gap-2 hover:text-slate-900" href="mailto:hello@curriculo.dev">
            <Mail size={16} /> Contact
          </a>
          <a className="flex items-center gap-2 hover:text-slate-900" href="#">
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
