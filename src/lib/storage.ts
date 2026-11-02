import { site } from "@/config/site";

const key = (k: string) => `${site.storagePrefix}:${k}`;

/** localStorage can throw (private mode, blocked storage) — never let it break the page. */
export function readStore<T>(k: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key(k));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(k: string, value: T) {
  try {
    window.localStorage.setItem(key(k), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
