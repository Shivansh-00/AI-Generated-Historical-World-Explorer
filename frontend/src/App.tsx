import { useEffect } from 'react';
import PromptPanel from './components/PromptPanel';
import TimelineSlider from './components/TimelineSlider';
import NPCDialoguePanel from './components/NPCDialoguePanel';
import LoadingScreen from './components/LoadingScreen';
import HistoricalWorldScene from './scenes/HistoricalWorldScene';
import { useNPCDialogue, useWorldEvolution, useWorldGeneration } from './hooks/useWorldEngine';
import { useAmbienceAudio } from './engine/soundEngine';
import { useWorldStore } from './store/worldStore';
import { eventBus } from './utils/eventBus';

export default function App() {
  const {
    currentWorld: world,
    selectedNPC,
    timelineYear,
    npcAnswer,
    isLoading,
    errorMessage,
    cameraMode,
    setWorld,
    setSelectedNPC,
    setTimelineYear,
    setNPCAnswer,
    setLoading,
    setErrorMessage,
    setCameraMode
  } = useWorldStore();

  const worldGeneration = useWorldGeneration();
  const worldEvolution = useWorldEvolution();
  const npcDialogue = useNPCDialogue();

  useAmbienceAudio(world?.ambienceAudio);

  useEffect(() => {
    const unsub = eventBus.on('npcClicked', ({ npcName }) => {
      setSelectedNPC(npcName);
    });
    return () => unsub();
  }, [setSelectedNPC]);

  const onGenerate = async (prompt: string) => {
    setLoading(true);
    setErrorMessage(undefined);
    try {
      const generated = await worldGeneration.mutateAsync(prompt);
      setWorld(generated);
      setTimelineYear(generated.currentYear);
      setSelectedNPC(undefined);
      setNPCAnswer(undefined);
      eventBus.emit('worldLoaded', { worldId: generated.id });
    } catch {
      setErrorMessage('Unable to generate world. Please try another prompt.');
    } finally {
      setLoading(false);
    }
  };

  const onYearChange = async (year: number) => {
    if (!world) return;
    setLoading(true);
    setErrorMessage(undefined);
    setTimelineYear(year);
    try {
      const evolved = await worldEvolution.mutateAsync({ worldId: world.id, year });
      setWorld(evolved);
      setTimelineYear(evolved.currentYear);
      eventBus.emit('timelineChanged', { year: evolved.currentYear });
    } catch {
      setErrorMessage('Unable to evolve timeline right now.');
    } finally {
      setLoading(false);
    }
  };

  const onAskNPC = async (question: string) => {
    if (!world || !selectedNPC) return;
    setErrorMessage(undefined);
    try {
      const response = await npcDialogue.mutateAsync({ worldId: world.id, npcName: selectedNPC, question });
      setNPCAnswer(response.answer);
    } catch {
      setErrorMessage('NPC is unavailable right now.');
    }
  };

  return (
    <div className="w-full h-full relative">
      <HistoricalWorldScene world={world} onNPCClick={setSelectedNPC} />
      {(isLoading || worldGeneration.isPending || worldEvolution.isPending) && <LoadingScreen />}
      <div className="absolute top-4 left-4 w-80 space-y-3 z-50">
        <PromptPanel onSubmit={onGenerate} loading={worldGeneration.isPending} />
        {world && timelineYear !== undefined && (
          <TimelineSlider years={world.timeline} year={timelineYear} onChange={onYearChange} />
        )}
        <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-700">
          <label className="text-xs mr-2">Camera</label>
          <button className="text-xs px-2 py-1 rounded bg-slate-700" onClick={() => setCameraMode(cameraMode === 'first-person' ? 'orbit' : 'first-person')}>
            {cameraMode}
          </button>
        </div>
        <NPCDialoguePanel npcName={selectedNPC} answer={npcAnswer} onAsk={onAskNPC} loading={npcDialogue.isPending} />
        {errorMessage && <div className="text-xs bg-rose-900/80 border border-rose-700 rounded p-2">{errorMessage}</div>}
      </div>
    </div>
  );
}
