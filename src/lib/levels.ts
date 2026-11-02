export const levelWord = (v: number) =>
  v <= 1.5 ? "very low" : v <= 2.5 ? "low" : v <= 3.5 ? "moderate" : v <= 4.5 ? "high" : "very high";

export const levelBand = (v: number): "low" | "moderate" | "high" => (v <= 2 ? "low" : v === 3 ? "moderate" : "high");
