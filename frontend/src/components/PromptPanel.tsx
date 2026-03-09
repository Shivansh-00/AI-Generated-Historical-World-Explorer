import { FormEvent, useState } from 'react';

interface PromptPanelProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
}

export default function PromptPanel({ onSubmit, loading }: PromptPanelProps) {
  const [prompt, setPrompt] = useState('Ancient Rome marketplace');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) onSubmit(prompt.trim());
  };

  return (
    <form onSubmit={submit} className="bg-slate-900/90 p-4 rounded-xl shadow-lg border border-slate-700 space-y-3">
      <h1 className="text-xl font-bold">REALITYARCHIVE</h1>
      <p className="text-xs text-slate-300">Generate explorable historical worlds from natural language.</p>
      <input
        className="w-full bg-slate-800 border border-slate-600 p-2 rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Paris during the French Revolution"
      />
      <button
        disabled={loading}
        className="w-full bg-brand text-slate-950 font-semibold px-3 py-2 rounded disabled:opacity-60"
      >
        {loading ? 'Generating...' : 'Generate World'}
      </button>
    </form>
  );
}
