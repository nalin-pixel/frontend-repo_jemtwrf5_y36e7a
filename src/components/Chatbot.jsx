import { useEffect, useRef, useState, useMemo } from 'react';
import { Send, Loader2 } from 'lucide-react';

const seedSuggestions = [
  'Show high-pay roles I should know',
  'Skills for Security Detection Engineer',
  'Companies hiring for MLOps',
  'Compare SRE vs Platform Engineering',
];

// Lightweight client-side knowledge base
const rolesCatalog = [
  {
    title: 'MLOps Engineer',
    summary: 'Productionize ML models, ship reliable training/inference, and monitor drift.',
    skills: ['Python', 'Docker', 'Kubernetes', 'MLflow', 'Airflow', 'Monitoring (Prometheus/Grafana)', 'CI/CD'],
    companies: ['NVIDIA', 'Databricks', 'Spotify', 'DoorDash', 'Rivian', 'Snowflake'],
    keywords: ['mlops', 'ml ops', 'ml operations', 'model ops', 'ml engineering'],
  },
  {
    title: 'Site Reliability Engineer (SRE)',
    summary: 'Keep systems reliable with SLOs/SLIs, on-call, incident response, and automation.',
    skills: ['Linux', 'Networking', 'Go/Python', 'Terraform', 'Kubernetes', 'Observability (Grafana, OpenTelemetry)'],
    companies: ['Google', 'Cloudflare', 'Coinbase', 'Stripe', 'Netflix', 'Shopify'],
    keywords: ['sre', 'reliability', 'site reliability', 'on-call', 'production'],
  },
  {
    title: 'Security Detection Engineer',
    summary: 'Design detection rules, hunt threats, and reduce MTTR across cloud and endpoints.',
    skills: ['MITRE ATT&CK', 'Sigma/KQL', 'SIEM (Splunk/Elastic)', 'EDR', 'Cloud Security', 'Threat Hunting'],
    companies: ['CrowdStrike', 'Palo Alto Networks', 'Elastic', 'Microsoft', 'Okta', 'Airbnb'],
    keywords: ['detection', 'security detection', 'siem', 'threat', 'soc'],
  },
  {
    title: 'Data Platform Engineer',
    summary: 'Build scalable data infra: ingestion, orchestration, catalogs, and lakehouse.',
    skills: ['Spark', 'Airflow', 'dbt', 'Kafka', 'Delta/Iceberg/Hudi', 'Data Modeling', 'Cloud Warehouses'],
    companies: ['Databricks', 'Snowflake', 'Airbnb', 'Uber', 'Doordash', 'Adobe'],
    keywords: ['data platform', 'platform data', 'lakehouse', 'data infra'],
  },
  {
    title: 'Developer Relations (DevRel)',
    summary: 'Blend engineering with storytelling: demos, docs, content, and community.',
    skills: ['APIs/SDKs', 'Sample Apps', 'Public Speaking', 'Technical Writing', 'DX Research', 'Content Strategy'],
    companies: ['Vercel', 'Stripe', 'GitHub', 'OpenAI', 'Twilio', 'Cloudflare'],
    keywords: ['devrel', 'developer relations', 'developer advocate', 'dx'],
  },
  {
    title: 'Reverse Engineering Researcher',
    summary: 'Analyze binaries, fuzz software, and uncover vulnerabilities/CVEs.',
    skills: ['C/C++', 'Assembly', 'Ghidra/IDA', 'Fuzzing (AFL/LibFuzzer)', 'Exploit Dev', 'OS Internals'],
    companies: ['Google Project Zero', 'Trail of Bits', 'Binarly', 'Fortinet', 'Apple', 'Intel'],
    keywords: ['reverse', 're', 'malware', 'binary', 'fuzzing'],
  },
  {
    title: 'Platform Engineer',
    summary: 'Build paved paths and internal developer platforms to accelerate teams.',
    skills: ['Kubernetes', 'Terraform', 'Backstage', 'GitOps', 'Internal Tooling', 'Observability'],
    companies: ['Spotify', 'Backstage ecosystem', 'HashiCorp', 'Shopify', 'Expedia Group'],
    keywords: ['platform', 'idp', 'internal developer platform', 'paved path'],
  },
  {
    title: 'Cloud FinOps Analyst',
    summary: 'Optimize cloud cost and performance with engineering + finance insights.',
    skills: ['Cloud Billing', 'Cost Modeling', 'Tagging/Showback', 'SQL', 'Dashboards', 'Scripting'],
    companies: ['Amazon', 'Google Cloud', 'Kubecost', 'DoiT', 'Coinbase'],
    keywords: ['finops', 'cloud cost', 'cloud finance'],
  },
];

function findRoles(query) {
  const q = query.toLowerCase();
  return rolesCatalog
    .map(r => ({
      role: r,
      score: (
        (r.title.toLowerCase().includes(q) ? 3 : 0) +
        (r.summary.toLowerCase().includes(q) ? 2 : 0) +
        (r.keywords.some(k => q.includes(k)) ? 3 : 0) +
        (r.skills.some(s => q.includes(s.toLowerCase())) ? 2 : 0)
      ),
    }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(x => x.role);
}

function formatRole(role, opts = { showSkills: true, showCompanies: true }) {
  const lines = [
    `• ${role.title} — ${role.summary}`,
  ];
  if (opts.showSkills) lines.push(`  Skills: ${role.skills.slice(0, 6).join(', ')}`);
  if (opts.showCompanies) lines.push(`  Hiring: ${role.companies.slice(0, 6).join(', ')}`);
  return lines.join('\n');
}

function replyFor(prompt) {
  const p = prompt.toLowerCase();

  // Compare pattern
  if (p.includes(' vs ') || p.includes('versus')) {
    const parts = p.replace('versus', 'vs').split(' vs ').map(x => x.trim());
    const left = findRoles(parts[0])[0];
    const right = findRoles(parts[1] || '')[0];
    if (left && right) {
      return [
        `Comparison: ${left.title} vs ${right.title}`,
        `Focus:`,
        `- ${left.title}: ${left.summary}`,
        `- ${right.title}: ${right.summary}`,
        `Key Skills:`,
        `- ${left.title}: ${left.skills.slice(0,5).join(', ')}`,
        `- ${right.title}: ${right.skills.slice(0,5).join(', ')}`,
        `Companies:`,
        `- ${left.title}: ${left.companies.slice(0,5).join(', ')}`,
        `- ${right.title}: ${right.companies.slice(0,5).join(', ')}`,
        `Tip: Choose based on whether you enjoy ${left.title.includes('SRE') ? 'operations, reliability, and automation' : 'platform building and enablement'} vs ${right.title.includes('SRE') ? 'operations, reliability, and automation' : 'platform building and enablement'}.`,
      ].join('\n');
    }
  }

  // Skills for X pattern
  if (p.startsWith('skills for') || p.includes('skills for ')) {
    const q = p.replace('skills for', '').trim();
    const roles = findRoles(q);
    if (roles.length) {
      return roles
        .slice(0, 3)
        .map(r => `• ${r.title} — Top Skills: ${r.skills.slice(0, 8).join(', ')}`)
        .join('\n');
    }
  }

  // Companies hiring for X pattern
  if (p.includes('companies') || p.includes('hiring')) {
    const roles = findRoles(p);
    if (roles.length) {
      return roles
        .slice(0, 4)
        .map(r => `• ${r.title} — Hiring: ${r.companies.slice(0, 8).join(', ')}`)
        .join('\n');
    }
  }

  // Generic: show a rich list
  const matches = findRoles(p);
  if (matches.length) {
    return [
      `Here are relevant high-pay roles:`,
      ...matches.map(r => formatRole(r)),
      `\nAsk “skills for <role>” or “companies hiring for <role>”.`,
    ].join('\n');
  }

  // Fallback: show catalog
  return [
    'Here are underrated, high-pay roles to explore:',
    ...rolesCatalog.slice(0, 6).map(r => formatRole(r)),
    '\nTip: Ask “skills for SRE”, “companies for MLOps”, or “compare SRE vs Platform Engineering”.',
  ].join('\n');
}

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hey! I'm your Curriculo bot. Ask me about high-pay, underrated roles. Try: ‘Show high-pay roles I should know’." },
  ]);
  const endRef = useRef(null);

  const quickRoles = useMemo(() => rolesCatalog.slice(0, 6), []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', content: text }]);
    setLoading(true);
    setTimeout(() => {
      const answer = replyFor(text);
      setMessages(m => [...m, { role: 'bot', content: answer }]);
      setLoading(false);
    }, 400);
  };

  return (
    <section id="chatbot" className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Chat with the Career Bot</h2>
          <p className="mt-2 text-slate-600">Get role suggestions, required skills, and companies hiring — no signup needed.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur">
          <div className="h-96 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'} max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed`}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="mb-3 flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                  <Loader2 className="animate-spin" size={16} /> Thinking...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about MLOps, SRE, DevRel, Platform..."
                className="flex-1 rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm outline-none backdrop-blur placeholder:text-slate-400 focus:border-indigo-500"
              />
              <button onClick={send} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700">
                <Send size={16} /> Send
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {seedSuggestions.map((s) => (
                <button key={s} onClick={() => setInput(s)} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-200">
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Quick roles:</span>
              {quickRoles.map((r) => (
                <button key={r.title} onClick={() => setInput(`Tell me about ${r.title}`)} className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700 ring-1 ring-indigo-100 transition hover:bg-indigo-100">
                  {r.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
