import { eventBus } from '../utils/eventBus';

export const handleNPCClick = (npcName: string, onSelect: (npc: string) => void) => {
  onSelect(npcName);
  eventBus.emit('npcClicked', { npcName });
};

export const onNPCClicked = (listener: (npcName: string) => void) => {
  return eventBus.on('npcClicked', ({ npcName }) => listener(npcName));
};
