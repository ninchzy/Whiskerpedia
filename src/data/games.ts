import type { CatLook } from "@/lib/types";

/* ───────────────────── Trivia ───────────────────── */

export interface TriviaQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export const trivia: TriviaQuestion[] = [
  {
    q: "Which wild cat is the main ancestor of the domestic cat?",
    options: ["European lynx", "African wildcat", "Sand cat", "Ocelot"],
    answer: 1,
    explain: "Genetic studies trace domestic cats to the African wildcat (Felis lybica) of the Near East and North Africa.",
  },
  {
    q: "How many toes does a typical (non-polydactyl) cat have in total?",
    options: ["16", "18", "20", "22"],
    answer: 1,
    explain: "Five on each front paw and four on each back paw: 18 in total.",
  },
  {
    q: "What is the reflective layer behind a cat's retina called?",
    options: ["Tapetum lucidum", "Nictitating membrane", "Macula", "Iris lucida"],
    answer: 0,
    explain: "The tapetum lucidum reflects light back through the retina, improving low-light vision and causing eyeshine.",
  },
  {
    q: "Cats are naturally most active at…",
    options: ["Midday", "Midnight only", "Dawn and dusk", "Whenever you're asleep — always"],
    answer: 2,
    explain: "Cats are crepuscular: most active at dawn and dusk (although it can feel like the last option!).",
  },
  {
    q: "Which nutrient must cats get from their diet, and is added to complete cat foods?",
    options: ["Vitamin C", "Taurine", "Fiber", "Glucose"],
    answer: 1,
    explain: "Taurine is an essential amino acid for cats; deficiency can cause heart and eye disease.",
  },
  {
    q: "What does a slow blink from a cat usually suggest?",
    options: ["Sleepiness only", "A relaxed, friendly signal", "A challenge", "Eye pain, always"],
    answer: 1,
    explain: "A slow blink is generally a relaxed, positive signal — cats in a study often slow-blinked back at people.",
  },
  {
    q: "Which plant is especially dangerous to cats, potentially causing kidney failure?",
    options: ["Spider plant", "Cat grass", "Lilies", "Boston fern"],
    answer: 2,
    explain: "True lilies and day lilies are extremely toxic to cats — even pollen or vase water.",
  },
  {
    q: "Calico cats are almost always…",
    options: ["Male", "Female", "Longhaired", "Blue-eyed"],
    answer: 1,
    explain: "The orange/black coat genes are on the X chromosome, so calicos are nearly always female.",
  },
  {
    q: "Where was a 9,500-year-old cat burial found alongside a human?",
    options: ["Egypt", "Cyprus", "China", "Peru"],
    answer: 1,
    explain: "Archaeologists found the burial in Cyprus, an island with no native wildcats.",
  },
  {
    q: "Which breed is known for 'ticked' coat hairs with bands of color?",
    options: ["Abyssinian", "Persian", "Ragdoll", "Birman"],
    answer: 0,
    explain: "Each Abyssinian hair has several bands of color, giving a warm, shimmering ticked coat.",
  },
  {
    q: "Where do cats mainly have sweat glands?",
    options: ["Ears", "Paw pads", "Tail", "Belly"],
    answer: 1,
    explain: "Cats sweat mainly through their paw pads.",
  },
  {
    q: "What is the key socialisation window for kittens?",
    options: ["0–1 weeks", "About 2–7 weeks", "3–6 months", "1 year"],
    answer: 1,
    explain: "Gentle handling and positive experiences between roughly 2 and 7 weeks shape a kitten's confidence.",
  },
  {
    q: "Which breed was founded by a hairless kitten born in Toronto in 1966?",
    options: ["Devon Rex", "Sphynx", "Cornish Rex", "Peterbald"],
    answer: 1,
    explain: "The Sphynx began with a kitten named Prune, born in Toronto.",
  },
  {
    q: "Which of these is NOT a reason cats scratch?",
    options: ["Maintaining claws", "Stretching", "Scent marking", "Spite"],
    answer: 3,
    explain: "Scratching is a normal behavior for claw care, stretching and marking — not spite.",
  },
  {
    q: "Why is cow's milk a poor treat for many adult cats?",
    options: ["It's too cold", "Many are lactose intolerant", "It contains taurine", "Cats can't swallow liquids"],
    answer: 1,
    explain: "Many adult cats can't digest lactose well, which can cause stomach upset.",
  },
  {
    q: "Which breed's folded ears are linked to an inherited cartilage disorder?",
    options: ["Scottish Fold", "American Curl", "Turkish Angora", "Siamese"],
    answer: 0,
    explain: "The Scottish Fold's fold gene causes osteochondrodysplasia, affecting joints throughout the body.",
  },
  {
    q: "What is the 'flehmen response'?",
    options: ["A hunting crouch", "A lip curl to analyse scents", "A type of purr", "A sleeping position"],
    answer: 1,
    explain: "Cats curl their lip to draw scents to the vomeronasal organ in the roof of the mouth.",
  },
  {
    q: "Roughly how long do adult cats commonly sleep each day?",
    options: ["4–6 hours", "8 hours", "12–16 hours", "20–22 hours"],
    answer: 2,
    explain: "Adult cats commonly sleep around 12–16 hours a day, in multiple naps.",
  },
  {
    q: "Which breed is classic for a silver coat with bold 'bullseye' tabby swirls?",
    options: ["Russian Blue", "American Shorthair", "Chartreux", "Burmese"],
    answer: 1,
    explain: "Silver classic tabby is the American Shorthair's iconic look.",
  },
  {
    q: "What do researchers call a purr with a hidden, higher-pitched cry used to ask for food?",
    options: ["Solicitation purr", "Hunger trill", "Breakfast yowl", "Chirrup"],
    answer: 0,
    explain: "A 2009 study described 'solicitation purrs' that people found more urgent.",
  },
  {
    q: "How many litter boxes are usually recommended for two cats?",
    options: ["One", "Two", "Three", "None — they'll share"],
    answer: 2,
    explain: "One per cat plus one extra, in different locations.",
  },
  {
    q: "Which coat gene is linked to deafness, especially with blue eyes?",
    options: ["Tabby", "Dominant white", "Colorpoint", "Rex"],
    answer: 1,
    explain: "The dominant white gene can affect inner-ear development, especially in blue-eyed cats.",
  },
  {
    q: "What does a tail held straight up usually signal?",
    options: ["Fear", "A friendly greeting", "Anger", "Hunger only"],
    answer: 1,
    explain: "Tail-up is a common friendly greeting between cats and toward people.",
  },
  {
    q: "Why should you never use some dog flea treatments on cats?",
    options: ["They smell bad", "Some contain permethrin, highly toxic to cats", "They're too weak", "Cats are immune to fleas"],
    answer: 1,
    explain: "Permethrin, found in some dog products, can be fatal to cats. Always use products made for cats.",
  },
  {
    q: "Which breed is nicknamed 'the gentle giant' and often chirps and trills?",
    options: ["Maine Coon", "Devon Rex", "Siamese", "Exotic Shorthair"],
    answer: 0,
    explain: "Maine Coons are large, sociable cats known for chirping rather than loud meows.",
  },
];

/* ───────────────────── Fact or fiction ───────────────────── */

export interface FactOrFiction {
  statement: string;
  isFact: boolean;
  explain: string;
}

export const factOrFiction: FactOrFiction[] = [
  { statement: "Cats always land safely on their feet.", isFact: false, explain: "Cats can twist mid-air, but falls still cause serious injuries — vets call it high-rise syndrome." },
  { statement: "A bowl of milk is a healthy treat for cats.", isFact: false, explain: "Many adult cats are lactose intolerant. Fresh water is best." },
  { statement: "Cats only purr when they're happy.", isFact: false, explain: "Cats also purr when stressed, unwell or in pain." },
  { statement: "Cats can't taste sweet things.", isFact: true, explain: "Cats lack a functional sweet-taste receptor gene." },
  { statement: "Calico cats are almost always female.", isFact: true, explain: "The coat colors are X-linked, so calicos usually have two X chromosomes." },
  { statement: "Indoor cats don't need vet check-ups.", isFact: false, explain: "Indoor cats still need preventive care — they hide illness well." },
  { statement: "You should never trim a cat's whiskers.", isFact: true, explain: "Whiskers are sensory organs; trimming them can disorient a cat." },
  { statement: "All cats hate water.", isFact: false, explain: "Many dislike getting wet, but some — like many Bengals and Turkish Vans — enjoy water play." },
  { statement: "Cats are strictly nocturnal.", isFact: false, explain: "Cats are crepuscular: most active at dawn and dusk." },
  { statement: "Cats can form strong bonds with their people.", isFact: true, explain: "Research on attachment suggests many cats form secure bonds with their caregivers." },
  { statement: "Lilies are dangerous to cats.", isFact: true, explain: "True lilies and day lilies can cause kidney failure — even the pollen." },
  { statement: "A wagging tail means a cat is happy.", isFact: false, explain: "A swishing or thumping tail often signals irritation or arousal." },
  { statement: "Kittens are born with their eyes open.", isFact: false, explain: "Kittens' eyes usually open around 7–10 days after birth." },
  { statement: "Declawing is like trimming nails.", isFact: false, explain: "Declawing amputates the last bone of each toe; many vets oppose it for non-medical reasons." },
  { statement: "Black cats are considered lucky in some cultures.", isFact: true, explain: "In parts of Britain and Japan, black cats are symbols of good luck." },
  { statement: "Cats need taurine in their diet.", isFact: true, explain: "Taurine is essential for cats' heart and eye health." },
  { statement: "Cats sweat through their paw pads.", isFact: true, explain: "Their main sweat glands are in the paw pads." },
  { statement: "Onions and garlic are safe in small amounts for cats.", isFact: false, explain: "Onions, garlic and related plants can damage cats' red blood cells." },
  { statement: "Pregnant people must give up their cats.", isFact: false, explain: "Precautions like having someone else clean the litter box reduce toxoplasmosis risk — ask your doctor." },
  { statement: "Domestic cats are genetically close to wildcats.", isFact: true, explain: "Cats show relatively few genetic changes from their wild ancestors." },
  { statement: "Hairless cats are hypoallergenic.", isFact: false, explain: "The main cat allergen is in saliva and skin, so no breed is truly hypoallergenic." },
  { statement: "Most orange tabby cats are male.", isFact: true, explain: "The orange gene is X-linked, so males need only one copy." },
];

/* ───────────────────── Cat of the day ───────────────────── */

export interface FeaturedCat {
  name: string;
  title: string;
  personality: string;
  funFact: string;
  likes: string;
  dislikes: string;
  look: CatLook;
}

export const featuredCats: FeaturedCat[] = [
  {
    name: "Biscuit",
    title: "Professional sunbeam inspector",
    personality: "A cheerful orange tabby who greets every visitor and naps wherever the light lands.",
    funFact: "Orange tabbies are more often male, because the orange gene sits on the X chromosome.",
    likes: "Warm windowsills",
    dislikes: "Closed doors",
    look: { coat: "#E39A52", accent: "#B05E24", pattern: "mackerel", eyes: "#C7B13C", ears: "normal", face: "round", fluff: 0 },
  },
  {
    name: "Pepper",
    title: "Midnight zoomies champion",
    personality: "A sleek black cat with copper eyes who saves all her energy for 5 a.m.",
    funFact: "Cats are crepuscular — naturally most active around dawn and dusk.",
    likes: "Crinkly balls",
    dislikes: "Vacuum cleaners",
    look: { coat: "#2E2A2B", pattern: "solid", eyes: "#E0952F", ears: "normal", face: "wedge", fluff: 0, build: 0 },
  },
  {
    name: "Mochi Jr.",
    title: "Fluffy cloud of dignity",
    personality: "A cream longhair who accepts brushing only on Tuesdays (and treats every day).",
    funFact: "Long-haired cats can develop painful mats without regular brushing.",
    likes: "Quiet afternoons",
    dislikes: "Too much fuss",
    look: { coat: "#F6E7CF", accent: "#E8CFA8", pattern: "solid", eyes: "#D49A3A", ears: "small", face: "round", fluff: 2 },
  },
  {
    name: "Juniper",
    title: "Curious houseplant critic",
    personality: "A tortoiseshell explorer who has inspected every cupboard in the house.",
    funFact: "Tortoiseshell cats, like calicos, are almost always female.",
    likes: "Cardboard boxes",
    dislikes: "Being ignored",
    look: { coat: "#3A2C26", accent: "#C6733A", accent2: "#E3A56A", pattern: "tortie", eyes: "#B9A93A", ears: "normal", face: "wedge", fluff: 0 },
  },
  {
    name: "Sir Reginald",
    title: "Gentleman of the sofa",
    personality: "A tuxedo cat who sits with perfect posture and demands his dinner precisely on time.",
    funFact: "Cats can learn routines and often 'remind' you when it's mealtime.",
    likes: "Routine",
    dislikes: "Late breakfasts",
    look: { coat: "#2F2A2A", accent: "#FAF6F0", pattern: "bicolor", eyes: "#9FBF4A", ears: "normal", face: "round", fluff: 0 },
  },
  {
    name: "Luna",
    title: "Blue-eyed whisper",
    personality: "A soft-spoken colorpoint who slow-blinks at everyone she trusts.",
    funFact: "A slow blink is often a friendly, relaxed signal — try one back!",
    likes: "Gentle chin scratches",
    dislikes: "Loud music",
    look: { coat: "#F2E6D6", accent: "#6A564C", pattern: "pointed", eyes: "#4C8BD6", ears: "normal", face: "round", fluff: 1 },
  },
  {
    name: "Pumpkin",
    title: "Snack negotiator",
    personality: "A round calico with a meow that could charm the treats out of any cupboard.",
    funFact: "Some cats hide a higher-pitched cry inside their purr when asking for food.",
    likes: "Breakfast",
    dislikes: "Diet talk",
    look: { coat: "#FBF4EA", accent: "#E3995A", accent2: "#4A3A33", pattern: "calico", eyes: "#79B058", ears: "normal", face: "round", fluff: 0, build: 2 },
  },
  {
    name: "Ziggy",
    title: "Gravity tester",
    personality: "A spotted athlete who believes every shelf is a launch pad.",
    funFact: "Cats can jump several times their body length, thanks to powerful back legs.",
    likes: "High shelves",
    dislikes: "Staying still",
    look: { coat: "#D9A35A", accent: "#5A3820", pattern: "spotted", eyes: "#8DB04A", ears: "normal", face: "wedge", fluff: 0, build: 1 },
  },
  {
    name: "Clover",
    title: "Gentle grey cuddle",
    personality: "A shy blue cat who chooses one lap and sticks to it.",
    funFact: "Shy cats gain confidence when they can choose when to approach.",
    likes: "Soft blankets",
    dislikes: "New visitors",
    look: { coat: "#8A95A3", pattern: "solid", eyes: "#4FB06A", ears: "normal", face: "round", fluff: 0 },
  },
  {
    name: "Noodle",
    title: "Tiny wavy gremlin",
    personality: "A curly-coated rascal who rides on shoulders and steals hair ties.",
    funFact: "Hair ties and string are dangerous if swallowed — keep them tidied away.",
    likes: "Shoulder rides",
    dislikes: "Being alone",
    look: { coat: "#D7C3B0", accent: "#9C8270", pattern: "solid", eyes: "#D9B23C", ears: "large", face: "wedge", fluff: 0, curly: true, build: 0 },
  },
];

/* ───────────────────── Personality generator ───────────────────── */

export const personalityQuestions = [
  {
    id: "weekend",
    question: "Your cat's perfect Saturday?",
    options: [
      { id: "nap", label: "A nine-hour nap", score: { calm: 2 } },
      { id: "explore", label: "Exploring every cupboard", score: { curious: 2 } },
      { id: "party", label: "Greeting every visitor", score: { social: 2 } },
      { id: "plot", label: "Plotting world domination", score: { sassy: 2 } },
    ],
  },
  {
    id: "snack",
    question: "Pick a snack style:",
    options: [
      { id: "fancy", label: "Tiny gourmet portions", score: { sassy: 1, calm: 1 } },
      { id: "puzzle", label: "Hunting it from a puzzle toy", score: { curious: 2 } },
      { id: "share", label: "Begging politely at the table", score: { social: 2 } },
      { id: "whenever", label: "Whenever, wherever", score: { playful: 2 } },
    ],
  },
  {
    id: "toy",
    question: "Favourite toy?",
    options: [
      { id: "feather", label: "Feather wand", score: { playful: 2 } },
      { id: "box", label: "An empty box", score: { calm: 1, curious: 1 } },
      { id: "human", label: "The human's hair", score: { social: 1, sassy: 1 } },
      { id: "bottle-cap", label: "A bottle cap under the fridge", score: { curious: 1, playful: 1 } },
    ],
  },
  {
    id: "mood",
    question: "When the doorbell rings…",
    options: [
      { id: "hide", label: "Vanishes under the bed", score: { calm: 2 } },
      { id: "run", label: "Races to the door first", score: { social: 2 } },
      { id: "watch", label: "Watches from the top of the bookshelf", score: { curious: 1, sassy: 1 } },
      { id: "ignore", label: "Ignores it completely", score: { sassy: 2 } },
    ],
  },
] as const;

export type PersonalityTrait = "calm" | "curious" | "social" | "sassy" | "playful";

export const personalityTypes: Record<
  PersonalityTrait,
  { type: string; tagline: string; likes: string[]; dislikes: string[]; quirks: string[]; activities: string[] }
> = {
  calm: {
    type: "The Cosy Philosopher",
    tagline: "A fluffy, thoughtful soul who believes naps are a form of meditation.",
    likes: ["Quiet time", "Warm blankets", "Rainy days"],
    dislikes: ["Too much fuss", "Loud noises", "Surprise baths"],
    quirks: ["Sleeps with one paw over its eyes", "Sits in perfect loaf form", "Slow-blinks at houseplants"],
    activities: ["Sunbeam napping", "Window meditation", "Blanket nesting"],
  },
  curious: {
    type: "The Tiny Detective",
    tagline: "No drawer unopened, no mystery unsolved.",
    likes: ["Cardboard boxes", "Open cupboards", "New smells"],
    dislikes: ["Closed doors", "Boredom", "Being left out"],
    quirks: ["Investigates every grocery bag", "Chatters at birds", "Opens doors with its paws"],
    activities: ["Puzzle feeders", "Cupboard exploring", "Bird watching"],
  },
  social: {
    type: "The Welcome Committee",
    tagline: "A friendly little host who never misses a guest.",
    likes: ["Company", "Lap time", "Gentle chin scratches"],
    dislikes: ["Being alone", "Closed bedroom doors", "Quiet evenings"],
    quirks: ["Greets you at the door", "Head-bumps every visitor", "Follows you to the bathroom"],
    activities: ["Lap sitting", "Supervising chores", "Video-call cameos"],
  },
  sassy: {
    type: "The Moody Aristocrat",
    tagline: "Affectionate on its own terms — and only on its own terms.",
    likes: ["Quiet time", "Top-shelf views", "Fancy dinners"],
    dislikes: ["Too much attention", "Mondays", "Being picked up"],
    quirks: ["Knocks things off tables with eye contact", "Demands a door open, then refuses", "Sits on whatever you're reading"],
    activities: ["Judging from above", "Ignoring its name", "Choosing the expensive bed (the box it came in)"],
  },
  playful: {
    type: "The Zoomie Rocket",
    tagline: "Pure kitten energy, whatever its age.",
    likes: ["Feather wands", "Chasing", "Crinkly toys"],
    dislikes: ["Naptime rules", "Toys out of reach", "Waiting"],
    quirks: ["Midnight zoomies", "Ambushes ankles from behind doors", "Brings toys to play fetch"],
    activities: ["Chase games", "Fetch", "Hallway sprints"],
  },
};
