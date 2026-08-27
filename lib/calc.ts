/* ============================================================================
   Polybag arithmetic.
   ----------------------------------------------------------------------------
   The trade uses two formulas that agree to within ~1.6%:

     metric    kg/1000 = W(cm) × L(cm) × micron × 0.0001849
     imperial  kg/1000 = W(in) × L(in) × gauge  ÷ 3300

   The metric constant encodes a film density of 0.9245 g/cm³, standard for
   polyethylene film:   0.0002 × ρ = 0.0001849  →  ρ = 0.9245
   (0.0002 comes from two film layers × micron→cm × 1000 bags.)

   We use the metric form throughout and expose density so LD/LLD/HD can be
   distinguished where it matters.
   ============================================================================ */

export const DENSITY = {
  LD:  0.922,
  LLD: 0.9245,
  HD:  0.952,
} as const;

export type Material = keyof typeof DENSITY;

export const IN_TO_CM = 2.54;

/** micron → gauge (100 gauge = 25 micron) */
export const micronToGauge = (um: number) => um * 4;
/** gauge → micron */
export const gaugeToMicron = (g: number) => g / 4;
/** micron → mil (1 mil = 25.4 micron) */
export const micronToMil = (um: number) => um / 25.4;
/** mil → micron */
export const milToMicron = (mil: number) => mil * 25.4;

export interface BagInput {
  /** width in inches */
  widthIn: number;
  /** length / height in inches */
  lengthIn: number;
  /** film thickness in micron */
  micron: number;
  /** gusset depth in inches, if any (adds material on both sides) */
  gussetIn?: number;
  material?: Material;
}

export interface BagResult {
  /** grams per single bag */
  gramsPerBag: number;
  /** kilograms per 1,000 bags */
  kgPer1000: number;
  /** how many bags in one kilogram */
  bagsPerKg: number;
  widthCm: number;
  lengthCm: number;
  gauge: number;
  mil: number;
}

export function calcBag({
  widthIn,
  lengthIn,
  micron,
  gussetIn = 0,
  material = "LLD",
}: BagInput): BagResult {
  const rho = DENSITY[material];
  // constant for this density: two layers, micron→cm, ×1000 bags
  const k = 0.0002 * rho;

  // A gusset adds material on both side panels: effective flat width grows
  // by the full gusset depth (half fold on each side, two walls each).
  const effWidthIn = widthIn + gussetIn;

  const widthCm = effWidthIn * IN_TO_CM;
  const lengthCm = lengthIn * IN_TO_CM;

  const kgPer1000 = widthCm * lengthCm * micron * k;
  const gramsPerBag = kgPer1000;           // kg/1000 === g/1
  const bagsPerKg = gramsPerBag > 0 ? 1000 / gramsPerBag : 0;

  return {
    gramsPerBag,
    kgPer1000,
    bagsPerKg,
    widthCm: widthIn * IN_TO_CM,
    lengthCm,
    gauge: micronToGauge(micron),
    mil: micronToMil(micron),
  };
}

export interface OrderCost {
  totalKg: number;
  totalCost: number;
  costPerBag: number;
}

export function calcOrder(res: BagResult, quantity: number, ratePerKg: number): OrderCost {
  const totalKg = (res.gramsPerBag * quantity) / 1000;
  const totalCost = totalKg * ratePerKg;
  return {
    totalKg,
    totalCost,
    costPerBag: quantity > 0 ? totalCost / quantity : 0,
  };
}

/** How many bags you get for a given budget in kilograms. */
export function bagsForKg(res: BagResult, kg: number) {
  return res.gramsPerBag > 0 ? (kg * 1000) / res.gramsPerBag : 0;
}

/* ————————————————— thickness advisor ————————————————— */

export interface ThicknessInput {
  /** contents weight in kg */
  loadKg: number;
  /** are the contents sharp / angular? */
  sharp: boolean;
  /** will the bag be handled repeatedly / shipped by courier? */
  transit: boolean;
}

export function recommendMicron({ loadKg, sharp, transit }: ThicknessInput) {
  // Baseline from load. Conservative, matched to common Indian trade practice.
  let um: number;
  if (loadKg <= 0.25) um = 25;
  else if (loadKg <= 0.5) um = 30;
  else if (loadKg <= 1) um = 40;
  else if (loadKg <= 3) um = 50;
  else if (loadKg <= 5) um = 65;
  else if (loadKg <= 10) um = 80;
  else if (loadKg <= 20) um = 100;
  else if (loadKg <= 35) um = 125;
  else um = 150;

  const reasons: string[] = [
    `${loadKg} kg contents sets a baseline of ${um} micron.`,
  ];

  if (sharp) {
    um = Math.round(um * 1.35);
    reasons.push("Sharp or angular contents add 35% for puncture resistance.");
  }
  if (transit) {
    um = Math.round(um * 1.2);
    reasons.push("Courier and repeat handling add 20% for abrasion and drop.");
  }

  // snap to a thickness that is actually run on a line
  const steps = [15, 20, 25, 30, 35, 40, 50, 60, 65, 75, 80, 100, 125, 150, 175, 200];
  const snapped = steps.reduce((a, b) => (Math.abs(b - um) < Math.abs(a - um) ? b : a), steps[0]);
  if (snapped !== um) reasons.push(`Rounded to ${snapped} micron — a standard running thickness.`);

  return { micron: snapped, gauge: micronToGauge(snapped), reasons };
}

/* ————————————————— formatting ————————————————— */

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export const inr0 = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const num = (n: number, dp = 2) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: dp, minimumFractionDigits: dp });

export const num0 = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
