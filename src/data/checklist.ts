export interface ChecklistGroup {
  id: string;
  title: string;
  tint: string;
  items: { id: string; label: string; note?: string; guide?: string }[];
}

export const newOwnerChecklist: ChecklistGroup[] = [
  {
    id: "home",
    title: "Home ready",
    tint: "bg-butter-100",
    items: [
      { id: "safe-room", label: "Quiet safe room set up", guide: "preparing-your-home" },
      { id: "hiding", label: "Hiding spot (box or covered bed)" },
      { id: "windows", label: "Windows and balconies secured" },
      { id: "plants", label: "Toxic plants removed (especially lilies)", guide: "preparing-your-home" },
      { id: "hazards", label: "Strings, hair ties and cables tidied away" },
    ],
  },
  {
    id: "supplies",
    title: "Supplies",
    tint: "bg-pink-100",
    items: [
      { id: "carrier", label: "Secure carrier (top-opening is ideal)", guide: "choosing-supplies" },
      { id: "food", label: "Complete & balanced cat food", note: "Ask what they ate before to avoid sudden changes", guide: "feeding-basics" },
      { id: "bowls", label: "Food and water bowls" },
      { id: "litter", label: "Litter box, unscented litter and scoop", guide: "litter-box-basics" },
      { id: "scratch", label: "Tall, sturdy scratching post", guide: "scratching-and-climbing" },
      { id: "bed", label: "Cosy bed" },
      { id: "toys", label: "Wand toy and a few small toys", guide: "play-and-enrichment" },
      { id: "brush", label: "Brush or comb for the coat type", guide: "grooming-and-brushing" },
    ],
  },
  {
    id: "health",
    title: "Health & admin",
    tint: "bg-sage-100",
    items: [
      { id: "vet-register", label: "Registered with a local vet" },
      { id: "vet-visit", label: "First check-up booked", guide: "preventive-vet-visits" },
      { id: "records", label: "Vaccination and medical records collected" },
      { id: "microchip", label: "Microchip registered with your details" },
      { id: "parasites", label: "Parasite prevention plan discussed with vet" },
      { id: "emergency", label: "Emergency vet number saved", guide: "when-to-call-the-vet" },
    ],
  },
  {
    id: "first-weeks",
    title: "First weeks",
    tint: "bg-lavender-100",
    items: [
      { id: "eating", label: "Eating, drinking and using the litter box", guide: "settling-in" },
      { id: "routine", label: "Daily play routine started" },
      { id: "explore", label: "Gradually exploring the rest of the home" },
      { id: "carrier-out", label: "Carrier left out as a cosy, familiar spot" },
    ],
  },
];
