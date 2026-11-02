import type { Source } from "@/lib/types";

/**
 * Organisation-level references. We link to stable landing pages rather than
 * deep links that move around; each page has search or a breed/topic index.
 */
export const SRC = {
  cfa: { label: "The Cat Fanciers' Association — breed profiles", url: "https://cfa.org/breeds/" },
  tica: { label: "The International Cat Association (TICA) — breeds", url: "https://www.tica.org/" },
  gccf: { label: "Governing Council of the Cat Fancy (UK)", url: "https://www.gccfcats.org/" },
  icc: { label: "International Cat Care — cat care & inherited disorders", url: "https://icatcare.org/" },
  cornell: {
    label: "Cornell Feline Health Center",
    url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center",
  },
  ucdavis: { label: "UC Davis Veterinary Genetics Laboratory — feline DNA tests", url: "https://vgl.ucdavis.edu/" },
  aafp: { label: "American Association of Feline Practitioners (Cat Friendly)", url: "https://www.catfriendly.com/" },
  aspcaPoison: {
    label: "ASPCA Animal Poison Control — toxic & non-toxic plants",
    url: "https://www.aspca.org/pet-care/animal-poison-control",
  },
  aspca: { label: "ASPCA — cat care", url: "https://www.aspca.org/pet-care/cat-care" },
  rspca: { label: "RSPCA — cat welfare advice", url: "https://www.rspca.org.uk/adviceandwelfare/pets/cats" },
  avma: { label: "American Veterinary Medical Association — pet owners", url: "https://www.avma.org/resources-tools/pet-owners" },
  wsava: { label: "WSAVA Global Nutrition Guidelines", url: "https://wsava.org/global-guidelines/global-nutrition-guidelines/" },
  ipc: { label: "International Cat Care — iCatCare advice library", url: "https://icatcare.org/advice/" },
} satisfies Record<string, Source>;
