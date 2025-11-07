import Spline from '@splinetool/react-spline';
import { Rocket, MessageSquare } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vZX5NNlylxke-6DM/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-20 pb-28 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/20">
          <Rocket size={14} />
          Curriculo — Discover Hidden High-Pay IT Careers
        </span>
        <h1 className="mt-6 bg-gradient-to-br from-slate-900 via-indigo-700 to-fuchsia-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Your aesthetic gateway to underrated tech roles
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          Explore niche, well-paid paths with concise skill maps and real companies hiring.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#chatbot" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700">
            <MessageSquare size={18} /> Ask the Career Bot
          </a>
          <a href="#roles" className="rounded-xl bg-white/80 px-5 py-3 text-indigo-700 ring-1 ring-indigo-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
            Explore roles
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
    </section>
  );
}
