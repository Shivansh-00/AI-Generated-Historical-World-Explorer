import { useState } from 'react';

interface NPCDialoguePanelProps {
  npcName?: string;
  answer?: string;
  onAsk: (question: string) => void;
  loading: boolean;
}

export default function NPCDialoguePanel({ npcName, answer, onAsk, loading }: NPCDialoguePanelProps) {
  const [question, setQuestion] = useState('What happened here?');

  return (
    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 space-y-2">
      <h2 className="text-sm font-semibold">AI Historian NPC {npcName ? `— ${npcName}` : ''}</h2>
      <input
        className="w-full bg-slate-800 border border-slate-600 p-2 rounded"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={() => onAsk(question)} disabled={loading || !npcName} className="bg-brand text-slate-950 px-3 py-1 rounded font-semibold disabled:opacity-60">
        Ask NPC
      </button>
      <p className="text-xs text-slate-300 min-h-12">{answer || 'Click an NPC in the world and ask a question.'}</p>
    </div>
  );
}
