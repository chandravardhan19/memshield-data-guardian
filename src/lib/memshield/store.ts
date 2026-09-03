import { useSyncExternalStore } from "react";
import { defaultInput, type DemoInput } from "./engine";

let state: DemoInput = { ...defaultInput };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function setDemoInput(next: Partial<DemoInput>) {
  state = { ...state, ...next };
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function useDemoInput(): DemoInput {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
