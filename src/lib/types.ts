export type Level = 1 | 2 | 3 | 4 | 5;

export type CoatLength = "short" | "medium" | "long" | "hairless";
export type SizeCategory = "small" | "medium" | "large";
export type Sociability = "independent" | "balanced" | "affectionate";
export type Environment = "apartment" | "adaptable" | "space";

export type CoatPattern =
  | "solid"
  | "tabby"
  | "mackerel"
  | "pointed"
  | "mitted"
  | "bicolor"
  | "calico"
  | "tortie"
  | "spotted"
  | "ticked"
  | "mink";

export type EarShape = "normal" | "large" | "small" | "folded" | "tufted";
export type FaceShape = "round" | "wedge" | "flat";

/** Parameters for the procedurally drawn cat illustration. */
export interface CatLook {
  coat: string;
  /** Stripes, points, spots or patches. */
  accent?: string;
  /** Third color for calico / tortie. */
  accent2?: string;
  pattern: CoatPattern;
  eyes: string;
  /** Second eye color for odd-eyed cats. */
  eyes2?: string;
  ears: EarShape;
  face: FaceShape;
  fluff: 0 | 1 | 2;
  hairless?: boolean;
  curly?: boolean;
  /** Body build: 0 slender, 1 medium, 2 sturdy. */
  build?: 0 | 1 | 2;
}

export interface Source {
  label: string;
  url: string;
}

export interface HealthNote {
  name: string;
  note: string;
}

export interface Breed {
  slug: string;
  name: string;
  pronunciation: string;
  origin: string;
  tagline: string;
  description: string;
  history: string;
  size: SizeCategory;
  weight: string;
  lifespan: string;
  coatLength: CoatLength;
  coatType: string;
  colors: string;
  recognition: string;
  temperament: string[];
  traits: {
    activity: Level;
    affection: Level;
    playfulness: Level;
    vocal: Level;
    grooming: Level;
    shedding: Level;
    curiosity: Level;
  };
  sociability: Sociability;
  environment: Environment;
  household: { children: Level; dogs: Level; cats: Level };
  personality: string;
  compatibility: string;
  care: { grooming: string; exercise: string; feeding: string; environment?: string };
  health: HealthNote[];
  screening: string;
  fit: { suits: string[]; challenges: string[]; commitment: string };
  identify: string;
  look: CatLook;
  similar: string[];
  /** Distinctive appearance — used by the quiz's "unique look" answer. */
  distinctive?: boolean;
  /** Excluded from quiz recommendations (with the reason shown on the profile). */
  quizExcluded?: string;
  sources: Source[];
}

export type FactCategory =
  | "anatomy"
  | "senses"
  | "communication"
  | "sleep-behavior"
  | "hunting"
  | "evolution"
  | "kittens"
  | "history"
  | "purring"
  | "surprising";

export type Evidence = "established" | "studied" | "theory";

export interface Fact {
  id: string;
  title: string;
  body: string;
  category: FactCategory;
  evidence: Evidence;
  icon: IllustrationName;
  source?: Source;
}

export type CareCategory = "getting-started" | "daily-care" | "health" | "behavior";

export interface CareSection {
  heading: string;
  body?: string;
  steps?: string[];
}

export interface CareGuide {
  slug: string;
  title: string;
  category: CareCategory;
  summary: string;
  intro: string;
  readMinutes: number;
  icon: IllustrationName;
  sections: CareSection[];
  checklist?: string[];
  vetNote?: boolean;
  reminder: string;
  related: string[];
  references: Source[];
}

export type IllustrationName =
  | "whisker"
  | "paw"
  | "eye"
  | "ear"
  | "nose"
  | "heart"
  | "moon"
  | "fish"
  | "yarn"
  | "mouse"
  | "dna"
  | "kitten"
  | "scroll"
  | "wave"
  | "star"
  | "box"
  | "bowl"
  | "water"
  | "litter"
  | "brush"
  | "scratch"
  | "home"
  | "stethoscope"
  | "tooth"
  | "clock"
  | "bubble"
  | "cats"
  | "leaf"
  | "bag"
  | "shield";
