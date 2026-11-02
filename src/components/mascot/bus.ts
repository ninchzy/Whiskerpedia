import type { MascotPose } from "./MascotArt";

export interface MascotMessage {
  text: string;
  pose?: MascotPose;
}

const EVENT = "mascot:say";

/** Let any page or interaction give the floating mascot something to say. */
export function mascotSay(text: string, pose?: MascotPose) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<MascotMessage>(EVENT, { detail: { text, pose } }));
}

export function onMascotSay(cb: (m: MascotMessage) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<MascotMessage>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
