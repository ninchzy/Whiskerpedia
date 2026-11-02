/**
 * Branding lives here so the site can be renamed in one place.
 */
export const site = {
  name: "Whiskerpedia",
  shortName: "Whiskerpedia",
  mascotName: "Mochi",
  tagline: "Your little corner of the cat world",
  description:
    "An illustrated cat encyclopedia: explore breeds, learn fact-checked cat secrets, read practical care guides and find your purrfect match.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  storagePrefix: "whiskerpedia",
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/breeds", label: "Cat Breeds" },
  { href: "/facts", label: "Cat Facts" },
  { href: "/care", label: "Cat Care" },
  { href: "/quiz", label: "Find Your Cat" },
  { href: "/games", label: "Fun & Games" },
  { href: "/about", label: "About" },
] as const;
