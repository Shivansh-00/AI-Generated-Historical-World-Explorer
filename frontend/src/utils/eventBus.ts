type EventMap = {
  npcClicked: { npcName: string };
  worldLoaded: { worldId: string };
  timelineChanged: { year: number };
};

type EventName = keyof EventMap;
type Listener<K extends EventName> = (payload: EventMap[K]) => void;

class EventBus {
  private listeners = new Map<EventName, Set<Function>>();

  on<K extends EventName>(event: K, listener: Listener<K>) {
    const set = this.listeners.get(event) ?? new Set();
    set.add(listener);
    this.listeners.set(event, set);

    return () => this.off(event, listener);
  }

  off<K extends EventName>(event: K, listener: Listener<K>) {
    const set = this.listeners.get(event);
    if (!set) return;
    set.delete(listener);
  }

  emit<K extends EventName>(event: K, payload: EventMap[K]) {
    const set = this.listeners.get(event);
    if (!set) return;
    set.forEach((listener) => (listener as Listener<K>)(payload));
  }
}

export const eventBus = new EventBus();
