import type { IllustrationName } from "@/lib/types";

/** Trait dimensions the matching engine can score on. */
export type Dimension = "activity" | "affection" | "playfulness" | "curiosity" | "vocal" | "grooming" | "space";
export type HouseholdMember = "children" | "dogs" | "cats";
export type Bonus = "fluffy" | "distinctive";

export interface Preference {
  target: number;
  weight: number;
  /**
   * "match": closer is better in both directions.
   * "max": the user's limit — breeds above it are penalised, breeds below are fine.
   */
  mode?: "match" | "max";
}

export interface QuizOption {
  id: string;
  label: string;
  icon: IllustrationName;
  prefs?: Partial<Record<Dimension, Preference>>;
  household?: Partial<Record<HouseholdMember, number>>;
  bonus?: Partial<Record<Bonus, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  hint: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "day",
    question: "What's your ideal day at home?",
    hint: "No wrong answers — just your vibe.",
    options: [
      {
        id: "cosy",
        label: "Curled up with a book or movie",
        icon: "moon",
        prefs: { activity: { target: 2, weight: 1 }, affection: { target: 4, weight: 0.5 } },
      },
      {
        id: "active",
        label: "Playing games and staying active",
        icon: "yarn",
        prefs: { activity: { target: 5, weight: 1 }, playfulness: { target: 5, weight: 0.5 } },
      },
      {
        id: "social",
        label: "Spending time with friends and family",
        icon: "cats",
        prefs: { affection: { target: 4, weight: 0.6 }, activity: { target: 3, weight: 0.4 } },
        household: { children: 0.4 },
      },
      { id: "mix", label: "A little bit of everything", icon: "star", prefs: { activity: { target: 3, weight: 0.6 } } },
    ],
  },
  {
    id: "affection",
    question: "How affectionate would you like your cat to be?",
    hint: "Think cuddles, lap time and following you around.",
    options: [
      { id: "shadow", label: "My tiny shadow, please!", icon: "heart", prefs: { affection: { target: 5, weight: 1.5 } } },
      {
        id: "some",
        label: "Affectionate, but with some independence",
        icon: "paw",
        prefs: { affection: { target: 4, weight: 1.5 } },
      },
      { id: "nearby", label: "Happy to hang out nearby", icon: "home", prefs: { affection: { target: 3, weight: 1.5 } } },
      {
        id: "independent",
        label: "I enjoy a cat with a more independent personality",
        icon: "leaf",
        prefs: { affection: { target: 2, weight: 1.5 } },
      },
    ],
  },
  {
    id: "home",
    question: "What's your living situation?",
    hint: "Space matters less than enrichment — but some cats love room to roam.",
    options: [
      { id: "small", label: "A small apartment", icon: "box", prefs: { space: { target: 1, weight: 1.4, mode: "max" } } },
      { id: "medium", label: "A medium-sized home", icon: "home", prefs: { space: { target: 2, weight: 1, mode: "max" } } },
      { id: "large", label: "A larger home with plenty of room", icon: "leaf", prefs: { space: { target: 3, weight: 0.4 } } },
      { id: "flexible", label: "I have a flexible living situation", icon: "star", prefs: { space: { target: 2, weight: 0.5, mode: "max" } } },
    ],
  },
  {
    id: "grooming",
    question: "How much time can you dedicate to grooming?",
    hint: "Long coats can mat painfully without regular care.",
    options: [
      {
        id: "minimal",
        label: "As little as reasonably possible",
        icon: "clock",
        prefs: { grooming: { target: 1, weight: 2, mode: "max" } },
      },
      {
        id: "weekly",
        label: "A few brushing sessions each week",
        icon: "brush",
        prefs: { grooming: { target: 3, weight: 1.6, mode: "max" } },
      },
      {
        id: "frequent",
        label: "I'm happy to brush my cat frequently",
        icon: "brush",
        prefs: { grooming: { target: 4, weight: 1, mode: "max" } },
      },
      {
        id: "fun",
        label: "Grooming is part of the fun!",
        icon: "heart",
        prefs: { grooming: { target: 5, weight: 0.4, mode: "max" } },
        bonus: { fluffy: 0.4 },
      },
    ],
  },
  {
    id: "play",
    question: "How playful should your cat be?",
    hint: "Energetic cats need daily play to stay happy.",
    options: [
      {
        id: "napper",
        label: "A professional nap enthusiast",
        icon: "moon",
        prefs: { activity: { target: 1, weight: 1.2 }, playfulness: { target: 2, weight: 0.8 } },
      },
      {
        id: "bursts",
        label: "Playful in short bursts",
        icon: "star",
        prefs: { activity: { target: 3, weight: 1.2 }, playfulness: { target: 3, weight: 0.8 } },
      },
      {
        id: "adventurer",
        label: "An energetic little adventurer",
        icon: "mouse",
        prefs: { activity: { target: 5, weight: 1.2 }, playfulness: { target: 5, weight: 0.8 } },
      },
      {
        id: "interactive",
        label: "I want a cat that enjoys interactive play every day",
        icon: "yarn",
        prefs: { playfulness: { target: 5, weight: 1.2 }, curiosity: { target: 4, weight: 0.6 } },
      },
    ],
  },
  {
    id: "vocal",
    question: "How do you feel about a chatty cat?",
    hint: "Some breeds have plenty to say — loudly.",
    options: [
      { id: "quiet", label: "Quiet companionship, please", icon: "moon", prefs: { vocal: { target: 1, weight: 1.6, mode: "max" } } },
      { id: "little", label: "A little conversation is cute", icon: "bubble", prefs: { vocal: { target: 2, weight: 1.2, mode: "max" } } },
      { id: "fine", label: "I don't mind regular meowing", icon: "bubble", prefs: { vocal: { target: 4, weight: 0.6, mode: "max" } } },
      { id: "love", label: "I love a vocal, expressive cat!", icon: "heart", prefs: { vocal: { target: 5, weight: 1.2 } } },
    ],
  },
  {
    id: "household",
    question: "Are there other pets or children at home?",
    hint: "We look at breed tendencies — every individual cat still needs a careful introduction.",
    options: [
      { id: "none", label: "No, just me or my household", icon: "home" },
      { id: "cats", label: "Yes, other cats", icon: "cats", household: { cats: 1.4 } },
      { id: "dogs", label: "Yes, dogs", icon: "paw", household: { dogs: 1.4 } },
      { id: "children", label: "Yes, children", icon: "kitten", household: { children: 1.4 } },
      { id: "mix", label: "A mix of pets or family members", icon: "star", household: { children: 0.9, dogs: 0.9, cats: 0.9 } },
    ],
  },
  {
    id: "matters",
    question: "What matters most to you?",
    hint: "Pick the one that makes you smile most.",
    options: [
      {
        id: "fluffy",
        label: "A fluffy cuddle companion",
        icon: "heart",
        prefs: { affection: { target: 5, weight: 0.6 } },
        bonus: { fluffy: 1.4 },
      },
      {
        id: "athletic",
        label: "A playful, athletic personality",
        icon: "yarn",
        prefs: { activity: { target: 5, weight: 0.8 }, playfulness: { target: 5, weight: 0.6 } },
      },
      {
        id: "easygoing",
        label: "An easygoing, relaxed temperament",
        icon: "moon",
        prefs: { activity: { target: 2, weight: 0.8 }, vocal: { target: 2, weight: 0.5, mode: "max" } },
      },
      { id: "clever", label: "A curious, clever companion", icon: "star", prefs: { curiosity: { target: 5, weight: 1.4 } } },
      { id: "unique", label: "A unique look and personality", icon: "eye", bonus: { distinctive: 1.4 } },
    ],
  },
];
