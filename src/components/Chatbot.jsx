import { useEffect, useRef, useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const seedSuggestions = [
  'What does an MLOps Engineer do daily?',
  'How to prepare for SRE interviews?',
  'What skills for Security Detection Engineer?',
  'DevRel vs Developer Advocate differences?',
];

function botReply(prompt) {
  // Simple client-side heuristic bot (no backend yet)
  const p = prompt.toLowerCase();
  if (p.includes('mlops')) return 'MLOps Engineers build CI/CD for models, manage feature stores, and monitor drift. Learn Docker, K8s, model registries, and observability.';
  if (p.includes('sre') || p.includes('reliab')) return 'SRE focuses on reliability with SLOs/SLIs, on-call, incident response, and automation. Master Linux, networking, Terraform, and observability.';
  if (p.includes('detect') || p.includes('security')) return 'Security Detection Engineers craft SIEM rules, detect TTPs, and reduce MTTR. Study MITRE ATT&CK, Sigma rules, log pipelines, and cloud security.';
  if (p.includes('devrel')) return 'DevRel blends engineering with storytelling: demos, docs, talks, and community. Build sample apps, write, speak, and understand product fit.';
  if (p.includes('data platform')) return 'Data Platform Engineers design scalable data infra: lakehouse, orchestration, catalogs. Learn Spark, Airflow, dbt, and cloud warehouses.';
  return "I'm a lightweight guide. Ask about roles like MLOps, SRE, DevRel, Detection Engineering, or Data Platform Engineering.";
}

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hey! I\'m your Curriculo bot. Ask me about underrated, high-pay tech roles.' },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setLoading(true);
    setTimeout(() => {
      const answer = botReply(text);
      setMessages((m) => [...m, { role: 'bot', content: answer }]);
      setLoading(false);
    }, 500);
  };

  return (
    <section id="chatbot" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Chat with the Career Bot</h2>
          <p className="mt-2 text-slate-600">Quick insights tailored for CS undergrads exploring unconventional tracks.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-80 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'} max-w-[80%] rounded-2xl px-4 py-2 text-sm`}>{m.content}</div>
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

          <div className="border-t border-slate-200 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about MLOps, SRE, Detection Engineering..."
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500"
              />
              <button onClick={send} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                <Send size={16} /> Send
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {seedSuggestions.map((s) => (
                <button key={s} onClick={() => setInput(s)} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 hover:bg-slate-200">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
