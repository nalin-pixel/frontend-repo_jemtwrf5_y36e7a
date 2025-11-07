import { Brain, Shield, Cloud, Database, Cpu, Bug, Star } from 'lucide-react';

const roles = [
  {
    title: 'MLOps Engineer',
    icon: Cpu,
    pay: 'High',
    summary: 'Productionize ML models, monitor drift, and scale inference.',
    tags: ['Docker', 'Kubernetes', 'MLflow', 'Monitoring'],
  },
  {
    title: 'Site Reliability Engineer (SRE)',
    icon: Cloud,
    pay: 'High',
    summary: 'Build reliable systems, automate ops, and improve SLAs.',
    tags: ['Linux', 'Terraform', 'Observability', 'Incident Response'],
  },
  {
    title: 'Security Detection Engineer',
    icon: Shield,
    pay: 'High',
    summary: 'Create detection rules, hunt threats, and harden systems.',
    tags: ['SIEM', 'MITRE ATT&CK', 'KQL', 'Cloud Security'],
  },
  {
    title: 'Data Platform Engineer',
    icon: Database,
    pay: 'High',
    summary: 'Design robust data pipelines and lakehouse platforms.',
    tags: ['Spark', 'Airflow', 'dbt', 'Delta/Iceberg'],
  },
  {
    title: 'Developer Relations (DevRel)',
    icon: Brain,
    pay: 'High',
    summary: 'Blend engineering with storytelling for product adoption.',
    tags: ['DX', 'Docs', 'Demos', 'Community'],
  },
  {
    title: 'Security Researcher (Reverse Engineering)',
    icon: Bug,
    pay: 'High',
    summary: 'Analyze malware, fuzz binaries, and uncover CVEs.',
    tags: ['Ghidra', 'Fuzzing', 'Exploit Dev', 'C/C++'],
  },
];

export default function RoleGrid() {
  return (
    <section id="roles" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Lesser-known, high-pay roles</h2>
          <p className="mt-2 max-w-2xl text-slate-600">Curated tracks beyond the usual Frontend/Backend/DS buzzwords.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <article key={r.title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{r.title}</h3>
                  <p className="text-xs text-emerald-600">Compensation: {r.pay}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{r.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 ring-1 ring-slate-200">{t}</span>
                ))}
              </div>
              <div className="pointer-events-none mt-6 h-1.5 w-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 opacity-70" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
