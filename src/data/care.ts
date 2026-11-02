import type { CareCategory, CareGuide } from "@/lib/types";
import { SRC } from "./sources";

export const careCategories: { id: CareCategory; label: string; blurb: string; tint: string }[] = [
  { id: "getting-started", label: "Getting Started", blurb: "Bringing a cat home, the calm way.", tint: "bg-butter-100" },
  { id: "daily-care", label: "Daily Care", blurb: "Food, water, litter, grooming and play.", tint: "bg-pink-100" },
  { id: "health", label: "Health & Wellbeing", blurb: "Prevention and knowing when to call the vet.", tint: "bg-sage-100" },
  { id: "behavior", label: "Behavior", blurb: "Understanding what your cat is telling you.", tint: "bg-lavender-100" },
];

export const careGuides: CareGuide[] = [
  // ───────────── Getting started
  {
    slug: "preparing-your-home",
    title: "Preparing Your Home for a Cat",
    category: "getting-started",
    summary: "Cat-proof your space and set up a calm 'base camp' before your new friend arrives.",
    intro:
      "A little preparation makes the first days far less stressful — for you and your cat. Cats feel safest when they can explore a small, quiet area first, with everything they need close by.",
    readMinutes: 5,
    icon: "home",
    sections: [
      {
        heading: "Set up a safe room",
        body: "Choose a quiet room — a spare bedroom or study — where your cat can settle for the first few days before exploring the whole home.",
        steps: [
          "Place food and water on one side of the room and the litter box on the other.",
          "Add a hiding place: a covered bed, a cardboard box on its side, or space under a chair draped with a blanket.",
          "Provide a scratching post and a couple of simple toys.",
          "Add something that smells familiar, like a blanket from the shelter or previous home.",
        ],
      },
      {
        heading: "Cat-proof the rest of the home",
        steps: [
          "Secure window screens and balcony access — falls cause serious injuries.",
          "Remove toxic plants, especially lilies, which can cause kidney failure in cats.",
          "Store medicines, cleaning products, essential oils and human foods such as onions, garlic, grapes and chocolate out of reach.",
          "Tidy away string, hair ties, rubber bands and thread, which can be dangerous if swallowed.",
          "Check for hiding spots behind appliances and block gaps a cat could get stuck in.",
        ],
      },
      {
        heading: "Plan the first vet visit",
        body: "Book a check-up within the first week or two. Bring any records from the shelter or breeder and ask about vaccinations, parasite prevention, microchipping and neutering.",
      },
    ],
    checklist: ["Safe room chosen", "Windows and balconies secured", "Toxic plants removed", "Cables and strings tidied", "Vet appointment booked"],
    reminder: "Lilies are extremely toxic to cats — even the pollen. Keep them out of the house entirely.",
    related: ["choosing-supplies", "settling-in", "cat-friendly-home"],
    references: [SRC.icc, SRC.aspcaPoison, SRC.rspca],
  },
  {
    slug: "adopting-vs-buying",
    title: "Adopting vs. Buying a Cat",
    category: "getting-started",
    summary: "How to choose a responsible source — and why an adult cat can be the perfect match.",
    intro:
      "Whether you adopt from a shelter or buy from a breeder, the most important thing is finding a healthy, well-socialized cat whose personality fits your home.",
    readMinutes: 5,
    icon: "heart",
    sections: [
      {
        heading: "Adopting from a shelter or rescue",
        body: "Shelters and rescues care for cats of every age, color and personality — including many pedigree cats. Adult cats have settled personalities, so staff can often tell you whether a cat loves laps, tolerates dogs or prefers quiet homes. Adopted cats are commonly vaccinated, microchipped and neutered before going home.",
      },
      {
        heading: "Choosing a responsible breeder",
        steps: [
          "Meet the kittens with their mother, in the home where they were raised.",
          "Ask which health tests the parents have had (for example DNA tests or heart scans relevant to the breed) and ask to see results.",
          "Expect kittens to stay with their mother until at least 12–13 weeks old.",
          "A good breeder asks you questions too, and will take the cat back if your circumstances change.",
          "Avoid sellers who offer to meet in a car park, have many breeds available, or pressure you to decide quickly.",
        ],
      },
      {
        heading: "Think about welfare",
        body: "Some breeds have features linked to health problems — for example very flat faces or folded ears. Choosing cats with moderate features supports better welfare.",
      },
    ],
    reminder: "Meeting an adult cat first is one of the best ways to find a personality that suits you.",
    related: ["preparing-your-home", "settling-in"],
    references: [SRC.icc, SRC.rspca, SRC.aspca],
  },
  {
    slug: "choosing-supplies",
    title: "Choosing the Right Supplies",
    category: "getting-started",
    summary: "The essential shopping list — and the nice-to-haves that make life better.",
    intro: "You don't need everything in the pet shop. Focus on the basics that meet your cat's needs for food, water, toileting, scratching, resting and play.",
    readMinutes: 4,
    icon: "bag",
    sections: [
      {
        heading: "Essentials",
        steps: [
          "A sturdy, secure carrier (top-opening models make vet visits easier).",
          "Food and water bowls — wide, shallow bowls avoid whisker discomfort for some cats.",
          "A complete and balanced cat food; ask what your cat has been eating to avoid sudden changes.",
          "At least one large litter box plus unscented litter and a scoop.",
          "A tall, stable scratching post.",
          "A cosy bed and a hiding place.",
          "A few toys, including a wand toy for interactive play.",
        ],
      },
      {
        heading: "Nice to have",
        steps: [
          "A cat tree or wall shelves for climbing and perching.",
          "Puzzle feeders for mental stimulation.",
          "A brush or comb suited to your cat's coat.",
          "A water fountain, which some cats prefer.",
        ],
      },
      {
        heading: "One rule of thumb",
        body: "If you have more than one cat, provide multiple resources — bowls, beds, scratching posts and litter boxes — in separate locations so no cat has to compete.",
      },
    ],
    checklist: ["Carrier", "Food and water bowls", "Complete cat food", "Litter box, litter and scoop", "Scratching post", "Bed and hiding place", "Wand toy"],
    reminder: "Choose a carrier you can open from the top — it makes getting your cat out at the vet much calmer.",
    related: ["preparing-your-home", "litter-box-basics", "scratching-and-climbing"],
    references: [SRC.icc, SRC.aafp],
  },
  {
    slug: "settling-in",
    title: "Introducing a Cat to a New Home",
    category: "getting-started",
    summary: "What to expect in the first days and weeks — and how to help your cat feel safe.",
    intro:
      "Moving home is a big deal for a cat. Some explore within hours; others hide for days. Both are normal. Patience now builds a trusting relationship for years to come.",
    readMinutes: 5,
    icon: "box",
    sections: [
      {
        heading: "The first few days",
        steps: [
          "Open the carrier in the safe room and let your cat come out in its own time.",
          "Sit quietly nearby; let the cat approach you rather than reaching in to grab it.",
          "Keep the household calm, and limit visitors.",
          "Check that your cat is eating, drinking and using the litter box.",
        ],
      },
      {
        heading: "Expanding territory",
        body: "Once your cat is relaxed in the safe room — eating well, exploring and seeking attention — open the door and let it explore the rest of the home gradually. Keep the safe room available as a retreat.",
      },
      {
        heading: "How long does settling take?",
        body: "Many cats settle within a few weeks, but shy or previously stray cats can take months to feel fully at home. Don't rush; progress often comes in small steps.",
      },
      {
        heading: "When to call the vet",
        body: "Contact your vet if your cat hasn't eaten for more than 24 hours, hasn't urinated within 24 hours, or seems unwell. Cats that stop eating can develop serious liver problems.",
      },
    ],
    vetNote: true,
    reminder: "A cat that isn't eating for a day or more needs a vet's advice — don't wait it out.",
    related: ["preparing-your-home", "shy-or-anxious-cats", "introducing-cats"],
    references: [SRC.icc, SRC.rspca],
  },

  // ───────────── Daily care
  {
    slug: "feeding-basics",
    title: "Feeding Basics",
    category: "daily-care",
    summary: "Complete diets, portion sizes and feeding routines that suit a cat's natural style.",
    intro:
      "Cats are obligate carnivores with specific nutritional needs. The easiest way to meet them is a complete and balanced commercial cat food appropriate for your cat's life stage, fed in the right amount.",
    readMinutes: 5,
    icon: "bowl",
    sections: [
      {
        heading: "Choosing a food",
        steps: [
          "Look for food labeled 'complete and balanced' for your cat's life stage (kitten, adult or senior).",
          "Wet, dry or a mix can all work; wet food adds water to the diet.",
          "Change foods gradually over 7–10 days to avoid stomach upset.",
          "Avoid feeding dog food, which lacks nutrients cats need, such as taurine.",
        ],
      },
      {
        heading: "How much and how often",
        body: "Feeding guides on packaging are a starting point. Adjust to keep your cat at a healthy body condition — you should be able to feel the ribs easily under a thin layer of fat. Your vet can assess body condition at every visit. Many cats do well on several small meals or with puzzle feeders.",
      },
      {
        heading: "Foods to avoid",
        steps: [
          "Onions, garlic, chives and leeks (in any form).",
          "Grapes, raisins, chocolate, caffeine and alcohol.",
          "Cooked bones, and xylitol-sweetened products.",
          "Cow's milk — many adult cats are lactose intolerant.",
        ],
      },
    ],
    vetNote: true,
    reminder: "Treats should be no more than about 10% of your cat's daily calories.",
    related: ["hydration", "preventive-vet-visits", "senior-cat-care"],
    references: [SRC.wsava, SRC.icc, SRC.aspcaPoison],
  },
  {
    slug: "hydration",
    title: "Fresh Water and Hydration",
    category: "daily-care",
    summary: "Simple ways to help your cat drink more — an easy win for urinary and kidney health.",
    intro:
      "Cats evolved getting much of their water from prey, and many don't drink a lot from bowls. Encouraging hydration is a simple, everyday way to support their health.",
    readMinutes: 3,
    icon: "water",
    sections: [
      {
        heading: "Make water appealing",
        steps: [
          "Offer several water stations around the home, away from food bowls and litter boxes.",
          "Try wide, shallow bowls of ceramic, glass or stainless steel.",
          "Refresh water daily and clean bowls regularly.",
          "Some cats love running water — a cat fountain can help.",
          "Feeding some wet food increases daily water intake.",
        ],
      },
      {
        heading: "Watch for changes",
        body: "Drinking or urinating much more than usual can be an early sign of conditions such as kidney disease, diabetes or an overactive thyroid. Mention any change to your vet.",
      },
    ],
    vetNote: true,
    reminder: "A sudden increase in thirst is worth a vet check — it can be an early clue to illness.",
    related: ["feeding-basics", "litter-box-basics", "when-to-call-the-vet"],
    references: [SRC.icc, SRC.cornell],
  },
  {
    slug: "litter-box-basics",
    title: "Litter Box Setup and Hygiene",
    category: "daily-care",
    summary: "The right box, in the right place, kept the right way — the secret to happy toileting.",
    intro:
      "Most litter box problems are about the box, not the cat. A well-placed, clean, roomy box goes a long way toward preventing accidents.",
    readMinutes: 4,
    icon: "litter",
    sections: [
      {
        heading: "Box basics",
        steps: [
          "Provide one box per cat, plus one extra, in different locations.",
          "Choose a box at least 1.5 times your cat's body length; many commercial boxes are too small.",
          "Most cats prefer unscented, fine-grained clumping litter.",
          "Low-entry boxes help kittens and senior cats with stiff joints.",
        ],
      },
      {
        heading: "Location matters",
        body: "Place boxes in quiet, easy-to-reach spots away from food and water, noisy appliances and busy doorways. Avoid places where another pet could ambush a cat.",
      },
      {
        heading: "Keeping it clean",
        steps: [
          "Scoop at least once a day.",
          "Empty, wash with mild unscented soap and refill regularly.",
          "Avoid strong-smelling cleaners and deodorizers.",
        ],
      },
      {
        heading: "When to call the vet",
        body: "Straining, frequent trips with little urine, crying in the box or blood in urine need prompt attention. A male cat straining without passing urine is an emergency.",
      },
    ],
    vetNote: true,
    checklist: ["One box per cat plus one", "Boxes in quiet spots", "Scooped daily", "Unscented litter"],
    reminder: "A cat straining in the litter box without producing urine is an emergency — call a vet right away.",
    related: ["hydration", "when-to-call-the-vet", "choosing-supplies"],
    references: [SRC.icc, SRC.aafp, SRC.cornell],
  },
  {
    slug: "grooming-and-brushing",
    title: "Grooming and Brushing",
    category: "daily-care",
    summary: "Brushing, nail trims and coat checks, made calm and positive.",
    intro:
      "Cats groom themselves, but brushing removes loose hair, prevents mats and hairballs, and is a chance to check for lumps, parasites or skin problems.",
    readMinutes: 4,
    icon: "brush",
    sections: [
      {
        heading: "How often?",
        body: "Short-haired cats usually need a brush about once a week. Long-haired cats often need brushing several times a week, and some, like Persians, need daily combing.",
      },
      {
        heading: "Making it pleasant",
        steps: [
          "Start with short sessions when your cat is relaxed.",
          "Brush in the direction of hair growth with a tool suited to the coat.",
          "Reward with treats or play afterward.",
          "Stop before your cat becomes annoyed — end on a good note.",
        ],
      },
      {
        heading: "Nails, ears and eyes",
        body: "Trim the sharp tips of nails every few weeks if needed, avoiding the pink quick. Check ears and eyes for discharge or redness. Ask your vet or a vet nurse to demonstrate if you're unsure.",
      },
      {
        heading: "Mats and skin",
        body: "Don't cut out mats with scissors — cat skin is thin and easy to cut. A groomer or vet can remove them safely.",
      },
    ],
    reminder: "Short, happy grooming sessions beat long, stressful ones.",
    related: ["dental-hygiene", "senior-cat-care"],
    references: [SRC.icc, SRC.aspca],
  },
  {
    slug: "play-and-enrichment",
    title: "Playtime and Enrichment",
    category: "daily-care",
    summary: "Fun, hunting-style play that keeps indoor cats fit, confident and content.",
    intro:
      "Play isn't optional extra — it lets cats express natural hunting behavior and helps prevent boredom, weight gain and stress-related problems.",
    readMinutes: 4,
    icon: "yarn",
    sections: [
      {
        heading: "Play like prey",
        steps: [
          "Use wand toys to mimic prey: move them away from the cat, hide them behind objects, let them 'escape'.",
          "Play in several short sessions of 5–15 minutes a day.",
          "Let your cat catch the toy at the end, then offer a small meal or treat.",
          "Rotate toys so they stay interesting.",
          "Never use hands or feet as toys — it can teach rough play.",
        ],
      },
      {
        heading: "Enrichment ideas",
        steps: [
          "Puzzle feeders and hidden kibble for foraging.",
          "Window perches for bird-watching.",
          "Cardboard boxes and paper bags (handles removed).",
          "Safe cat grass and scent enrichment, such as catnip or silver vine, for cats that enjoy them.",
          "Clicker training for tricks.",
        ],
      },
      {
        heading: "Laser pointers",
        body: "If you use a laser pointer, end the session by switching to a toy your cat can actually catch, and never shine it in your cat's eyes.",
      },
    ],
    reminder: "End play with a 'catch' and a snack — it completes the hunting sequence.",
    related: ["reducing-boredom", "scratching-and-climbing", "cat-friendly-home"],
    references: [SRC.icc, SRC.aafp],
  },
  {
    slug: "scratching-and-climbing",
    title: "Scratching Posts and Climbing Spaces",
    category: "daily-care",
    summary: "Give cats what they need to scratch and climb — and protect your sofa at the same time.",
    intro:
      "Scratching is a normal behavior that keeps claws healthy, stretches muscles and leaves marks. Climbing lets cats survey their territory from a safe height. Both are essential.",
    readMinutes: 4,
    icon: "scratch",
    sections: [
      {
        heading: "The ideal scratching post",
        steps: [
          "Tall enough for a full stretch and heavy enough not to wobble.",
          "Covered in rough material like sisal rope or sisal fabric.",
          "Placed near sleeping areas and entrances, where cats like to scratch.",
          "Offer both vertical posts and horizontal scratchers to see what your cat prefers.",
        ],
      },
      {
        heading: "Redirecting unwanted scratching",
        steps: [
          "Place an appealing post right in front of the furniture being scratched.",
          "Make the furniture less attractive temporarily with a throw or double-sided tape.",
          "Reward your cat for using the post with praise, treats or play.",
          "Never punish scratching — it increases stress and doesn't remove the need.",
          "Trim nails regularly to reduce damage.",
        ],
      },
      {
        heading: "Declawing",
        body: "Declawing is the amputation of the end bones of the toes. Many veterinary organizations oppose it for non-medical reasons, and it is banned in many countries.",
      },
    ],
    reminder: "Put the scratching post where your cat already scratches — not hidden in a corner.",
    related: ["play-and-enrichment", "cat-friendly-home", "choosing-supplies"],
    references: [SRC.icc, SRC.avma, SRC.aafp],
  },

  // ───────────── Health
  {
    slug: "preventive-vet-visits",
    title: "Preventive Vet Visits, Vaccines and Parasites",
    category: "health",
    summary: "Why regular check-ups matter, even for healthy indoor cats.",
    intro:
      "Cats are experts at hiding illness. Regular check-ups let your vet catch problems early, often before you notice anything is wrong.",
    readMinutes: 5,
    icon: "stethoscope",
    sections: [
      {
        heading: "How often?",
        body: "Most adult cats benefit from a check-up at least once a year. Kittens need several visits for vaccinations, and many vets recommend twice-yearly visits for senior cats.",
      },
      {
        heading: "Vaccinations",
        body: "Core vaccines protect against serious diseases and are recommended for all cats. Others depend on lifestyle, such as whether your cat goes outside or stays in boarding catteries. Your vet will tailor a schedule to your cat.",
      },
      {
        heading: "Parasite prevention",
        body: "Fleas, ticks and worms can affect indoor and outdoor cats. Use only products recommended by your vet and made for cats — some dog flea products contain permethrin, which is highly toxic to cats.",
      },
      {
        heading: "Making visits less stressful",
        steps: [
          "Leave the carrier out at home as a familiar resting place.",
          "Cover the carrier with a towel during travel.",
          "Ask whether your clinic has cat-friendly practices or quieter appointment times.",
        ],
      },
    ],
    vetNote: true,
    reminder: "Never use dog flea treatments on cats — some are deadly to them.",
    related: ["dental-hygiene", "when-to-call-the-vet", "senior-cat-care"],
    references: [SRC.aafp, SRC.cornell, SRC.icc],
  },
  {
    slug: "dental-hygiene",
    title: "Dental Hygiene",
    category: "health",
    summary: "Dental disease is very common in cats — here's how to help prevent it.",
    intro:
      "Many adult cats develop some form of dental disease. Because cats hide pain, problems often go unnoticed until they're advanced.",
    readMinutes: 4,
    icon: "tooth",
    sections: [
      {
        heading: "Signs to watch for",
        steps: [
          "Bad breath.",
          "Red or bleeding gums.",
          "Dropping food, chewing on one side or pawing at the mouth.",
          "Reduced appetite or drooling.",
        ],
      },
      {
        heading: "Home care",
        body: "Daily tooth brushing with a cat toothbrush and cat-safe toothpaste is the gold standard — never use human toothpaste. Introduce it slowly with lots of rewards. Your vet can suggest dental diets or treats with evidence behind them.",
      },
      {
        heading: "Professional care",
        body: "Your vet will check teeth at each visit. Cleaning under anaesthesia may be needed to treat disease below the gum line.",
      },
    ],
    vetNote: true,
    reminder: "Human toothpaste isn't safe for cats — use one made for pets.",
    related: ["preventive-vet-visits", "senior-cat-care", "grooming-and-brushing"],
    references: [SRC.cornell, SRC.icc],
  },
  {
    slug: "when-to-call-the-vet",
    title: "Signs That Need Veterinary Attention",
    category: "health",
    summary: "Behavior changes and warning signs that mean it's time to call your vet.",
    intro:
      "This guide is educational, not diagnostic. If you're worried about your cat, it's always right to call your vet — they would rather hear from you early.",
    readMinutes: 5,
    icon: "shield",
    sections: [
      {
        heading: "Emergencies — call a vet immediately",
        steps: [
          "Difficulty breathing or open-mouth breathing.",
          "Straining to urinate with little or no urine (especially in male cats).",
          "Collapse, seizures or sudden weakness in the back legs.",
          "Suspected poisoning, including lilies, medicines or antifreeze.",
          "Severe bleeding, trauma, or a fall from height.",
          "Repeated vomiting, or vomiting with lethargy.",
        ],
      },
      {
        heading: "Call your vet soon",
        steps: [
          "Not eating for more than 24 hours.",
          "Drinking or urinating much more than usual.",
          "Weight loss or weight gain.",
          "Hiding much more than usual, or new aggression.",
          "Changes in litter box habits.",
          "Limping, reluctance to jump, or changes in grooming.",
        ],
      },
      {
        heading: "Behavior changes are health signals",
        body: "Changes in behavior — hiding, irritability, sleeping in new places or overgrooming — can be a sign of pain or illness. Mention any change to your vet, even if it seems small.",
      },
    ],
    vetNote: true,
    reminder: "When in doubt, call your vet. Never give human medicines to a cat — many are toxic.",
    related: ["preventive-vet-visits", "senior-cat-care", "body-language"],
    references: [SRC.cornell, SRC.icc, SRC.aspcaPoison],
  },
  {
    slug: "senior-cat-care",
    title: "Senior Cat Care",
    category: "health",
    summary: "Small changes that keep older cats comfortable, active and well.",
    intro:
      "Cats are often considered senior from around 11 years old, and many live well into their late teens. A few adjustments help them age comfortably.",
    readMinutes: 4,
    icon: "clock",
    sections: [
      {
        heading: "Comfort at home",
        steps: [
          "Low-sided litter boxes and ramps or steps to favorite spots.",
          "Warm, padded beds away from drafts.",
          "Food, water and litter on each floor of the home.",
          "Gentle play to keep joints moving.",
        ],
      },
      {
        heading: "Health checks",
        body: "Many vets recommend check-ups every six months for older cats, with blood and urine tests and blood-pressure checks to screen for common conditions such as kidney disease and an overactive thyroid.",
      },
      {
        heading: "Arthritis is common — and often missed",
        body: "Signs include reluctance to jump, missing the litter box, less grooming and sleeping more. Arthritis can be managed — speak to your vet rather than assuming it's 'just old age'.",
      },
    ],
    vetNote: true,
    reminder: "Slowing down isn't always 'just old age' — pain is treatable.",
    related: ["when-to-call-the-vet", "preventive-vet-visits", "dental-hygiene"],
    references: [SRC.aafp, SRC.icc, SRC.cornell],
  },

  // ───────────── Behavior
  {
    slug: "body-language",
    title: "Understanding Cat Body Language",
    category: "behavior",
    summary: "Read ears, eyes, tail and posture to understand how your cat is feeling.",
    intro:
      "Cats communicate a lot without making a sound. Reading the whole cat — ears, eyes, tail and body together — helps you respond to what they need.",
    readMinutes: 5,
    icon: "eye",
    sections: [
      {
        heading: "Relaxed and friendly",
        steps: [
          "Tail held upright, sometimes with a curl at the tip.",
          "Soft eyes and slow blinks.",
          "Ears facing forward, body loose.",
          "Head bumps, rubbing and kneading.",
        ],
      },
      {
        heading: "Worried or stressed",
        steps: [
          "Crouched body, tail tucked close.",
          "Ears turned sideways or flattened.",
          "Wide pupils and a fixed stare.",
          "Freezing, hiding or trying to get away.",
        ],
      },
      {
        heading: "Annoyed or overstimulated",
        steps: [
          "Tail thrashing or thumping.",
          "Skin rippling on the back.",
          "Head turning sharply toward your hand.",
          "Growling, hissing or swatting.",
        ],
      },
      {
        heading: "The belly myth",
        body: "A cat lying on its back is showing trust, but it isn't necessarily asking for a belly rub. Many cats dislike having their belly touched.",
      },
    ],
    reminder: "A slow blink is a friendly hello — try returning one.",
    related: ["shy-or-anxious-cats", "introducing-cats", "when-to-call-the-vet"],
    references: [SRC.icc, SRC.aafp],
  },
  {
    slug: "introducing-cats",
    title: "Introducing Cats to Each Other",
    category: "behavior",
    summary: "A slow, scent-first introduction gives new feline housemates the best chance.",
    intro:
      "Cats are territorial, and rushed introductions can lead to long-term tension. A gradual approach, over days to weeks, works best.",
    readMinutes: 6,
    icon: "cats",
    sections: [
      {
        heading: "Step by step",
        steps: [
          "Keep the newcomer in a separate room with all its own resources.",
          "Swap scents: exchange bedding or gently rub a cloth on each cat's cheeks and leave it near the other.",
          "Swap rooms so each cat can explore the other's scent.",
          "Let them see each other through a barrier such as a baby gate or a slightly open door, while doing something nice like eating.",
          "Progress to short, supervised time together, ending before any tension appears.",
          "Gradually extend time together over days or weeks.",
        ],
      },
      {
        heading: "Signs to slow down",
        body: "Hissing, growling, staring, blocking or hiding mean the cats need more time at the previous step. A little hissing early on is normal.",
      },
      {
        heading: "Set them up for success",
        body: "Provide plenty of resources in separate locations — litter boxes, food, water, beds and high perches — so cats don't have to compete.",
      },
    ],
    reminder: "Slow is fast: going back a step is normal, not failure.",
    related: ["body-language", "cat-friendly-home", "settling-in"],
    references: [SRC.icc, SRC.aspca],
  },
  {
    slug: "shy-or-anxious-cats",
    title: "Supporting Shy or Anxious Cats",
    category: "behavior",
    summary: "Build trust at your cat's pace with safe spaces, routine and gentle rewards.",
    intro:
      "Some cats are naturally cautious; others learned to be wary. With predictability and choice, many shy cats grow in confidence over time.",
    readMinutes: 5,
    icon: "moon",
    sections: [
      {
        heading: "Give control",
        steps: [
          "Provide hiding spots, including high places, and never pull a cat out of hiding.",
          "Let the cat choose to approach; offer a finger to sniff rather than reaching over its head.",
          "Keep a predictable daily routine for meals and play.",
          "Use treats and gentle play to build positive associations.",
        ],
      },
      {
        heading: "Reduce stressors",
        body: "Look for triggers such as loud noises, unfamiliar cats outside the window, or competition at resources. Small changes — like frosting a window or adding a second litter box — can help.",
      },
      {
        heading: "Get help",
        body: "If anxiety is severe or sudden, see your vet first, as pain or illness can cause behavior changes. Your vet may refer you to a qualified behaviorist.",
      },
    ],
    vetNote: true,
    reminder: "Let shy cats come to you — choice builds confidence.",
    related: ["body-language", "settling-in", "cat-friendly-home"],
    references: [SRC.icc, SRC.aafp],
  },
  {
    slug: "reducing-boredom",
    title: "Reducing Boredom",
    category: "behavior",
    summary: "Spot the signs of boredom and add daily variety to your cat's world.",
    intro:
      "Bored cats may overeat, sleep excessively, overgroom, wake you at night or invent their own (often destructive) games.",
    readMinutes: 3,
    icon: "yarn",
    sections: [
      {
        heading: "Quick wins",
        steps: [
          "Two or three short, hunting-style play sessions every day.",
          "Food puzzles instead of a bowl for some meals.",
          "A rotating toy box: put toys away and swap them weekly.",
          "Window perches, bird feeders outside (safely out of reach), and cat-safe plants to sniff.",
          "New cardboard boxes or paper bags to investigate.",
        ],
      },
      {
        heading: "Safe outdoor experiences",
        body: "Enclosed catios or harness training (introduced slowly) can offer safe outdoor enrichment for indoor cats.",
      },
    ],
    reminder: "Five minutes of play twice a day makes a big difference.",
    related: ["play-and-enrichment", "cat-friendly-home", "scratching-and-climbing"],
    references: [SRC.icc, SRC.aafp],
  },
  {
    slug: "cat-friendly-home",
    title: "Creating a Cat-Friendly Home",
    category: "behavior",
    summary: "The five pillars of a home where cats feel safe and thrive.",
    intro:
      "Feline welfare experts often describe five pillars of a healthy feline environment. Meeting them can prevent many common behavior problems.",
    readMinutes: 4,
    icon: "home",
    sections: [
      {
        heading: "The five pillars",
        steps: [
          "A safe place — somewhere to hide and rest undisturbed, ideally up high.",
          "Multiple, separated key resources — food, water, litter, scratching and resting areas.",
          "Opportunities for play and predatory behavior.",
          "Positive, consistent and predictable human interaction.",
          "An environment that respects the cat's sense of smell — avoid strong cleaners and scents.",
        ],
      },
      {
        heading: "Think vertically",
        body: "Shelves, cat trees and cleared window ledges give cats more space without more floor area — especially valuable in apartments.",
      },
    ],
    reminder: "More vertical space can make a small apartment feel big to a cat.",
    related: ["reducing-boredom", "introducing-cats", "scratching-and-climbing"],
    references: [SRC.aafp, SRC.icc],
  },
];

export const careMap = new Map(careGuides.map((g) => [g.slug, g]));

export function getGuide(slug: string) {
  return careMap.get(slug);
}

export function careCategoryLabel(id: CareCategory) {
  return careCategories.find((c) => c.id === id)?.label ?? id;
}
