export type declineCurveTypeOption = 'Exponential' | 'Harmonical' | 'Hyperbolic'
import { useInputStore } from './../stores/InputStore';

export type ResultsAfterSimulationReturnType = {
  qAS: string,
  qBS: string,
  piIdeal: string,
  piBS: string,
  piAS: string,
  dPSkinBS: string,
  flowEfficiencyBS: string,
  dPSkinAS: string,
  flowEfficiencyAS: string
}

type ResultsAfterSimulationParam = {
  wellName: string,
  wellType: string,
  pressure: string,
  viscosity: string,
  wellboreRadius: string,
  reservoirThickness: string,
  fvf: string,
  skinFactor: string,
  permeability: string,
  reservoirRadius: string,
  damagedK: string,
  q: string,
  skinFactorAS: string,
  permeabilityAS: string,
}

type SecondResultsParam = {
  declineCurveType: declineCurveTypeOption
  declineRate: string,
  abondonmentRate: string,
  qAS: string
  b: string
}

export type SecondResultsReturnType = {
  abondonmentTime: string
  cumulativeProduction: string
}

type COFResultsParam = {
  gravelPackLine: string
  gravelPackIndex: string
  packerIndex: string
  workoverDepthIndex: string
  mandrelIndex: string
  ageOfLastReentry: string
  angleOfDeviation: string
  lostWirelineIndex: string
  casingPatchIndex: string
  wellheadRepairIndex: string
}

export type COFResultsReturnType = {
  isCOFValid: boolean | null
  COF: number
}

type COFFormulaArgs = {
  a: string
  g: string
  p: string
  d: string
  m: string
  r: string
  v: string
  t: string
  c: string
  w: string
}

type TechnicalAnalysisResultsParam = {
  wellName: string
  permeabilityAS: string
  damagedK: string
  skinFactorAS: string
  skinFactor: string
  qAS: string
  qBS: string
  flowEfficiencyBS: string
  flowEfficiencyAS: string
  dpSkinBS: string
  pressure: string
  dpSkinAS: string
  cumulativeProduction: string
  abondonmentTime: string
}

export type TechnicalAnalysisResultsReturnType = {
  wellName: string
  undamagedKPercent: string
  undamagedSPercent: string
  productionGain: string
  flowEffeciencyBS: string
  flowEffeciencyAS: string
  RfactorBS: string
  RfactorAS: string
  cumulativeProduction: string
  abondonmentTimeMonths: string
  abondonmentTimeYears: string
}

type TechnicalAnalysisArgs = {
  wellName: string
  permeabilityAS: string
  damagedK: string
  skinFactorAS: string
  skinFactor: string
  qAS: string
  qBS: string
  flowEfficiencyBS: string
  flowEfficiencyAS: string
  PskinBS: string
  p: string
  PskinAS: string
  cumulativeProduction: string
  abondonmentTime: string
}

type EconomicDataResultsParam = {
  queriedWellName: string
  priceOfOil: string
  serviceCost: string
  operationalCost: string
  costOfChemicals: string
  durationOfWSJ: string
  deprecation: string
  initialInvestment: string
  discountRate: string
  taxes: string
  royalty: string

}

export type EconomicDataResultsReturnType = {
  totalCost: string
  totalRevenue: string
  EBIT: string
  taxableIncome: string
  netIncome: string
  netCashFlow: string
  npv: string
  paybackPeriod: string
}


export type HclResultsParam = {
  hclType: 'Yes' | 'No'
  k_md: string
  mica: string
  feldspars: string
  kaolinite: string
  mixedLayer: string
  illite: string
  smectite: string
  chlorite: string
  glauconite: string
  zeolite: string
}


export type HclResultsReturnType = {
  preflush: string
  mainTreatment: string
}


function inRange(value: number, range: string) {
  if (range.includes('-')) {
    const [min, max] = range.split('-').map(Number);
    return value >= min && value <= max;
  } else if (range.includes('<')) {
    return value < Number(range.slice(1));
  } else if (range.includes('>')) {
    return value > Number(range.slice(1));
  }
  return false;
}


function getPreflushFluid({
  k, clay, slit, chloriteGlauconite, zeolite
}: {
  k: string
  clay: string
  slit: string
  chloriteGlauconite: string
  zeolite: string
}) {
  // Define the conditions as an array of objects
  const conditions = [
    { k: '>100', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '15% HCl' },
    { k: '>100', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '10% HCl' },
    { k: '>100', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '10% HCl' },
    { k: '>100', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '10% HCl' },
    { k: '20-100', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '10% HCl' },
    { k: '20-100', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '7.5% HCl' },
    { k: '20-100', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '7.5% HCl' },
    { k: '20-100', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '7.5% HCl' },
    { k: '<20', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '7.5% HCl' },
    { k: '<20', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '5% HCl' },
    { k: '<20', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '5% HCl' },
    { k: '<20', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', preflush: '5% HCl' },
    { k: '>100', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '15% HCl + 5% acetic acid' },
    { k: '>100', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '10% HCl + 5% acetic acid' },
    { k: '>100', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '10% HCl + 5% acetic acid' },
    { k: '>100', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '10% HCl + 5% acetic acid' },
    { k: '20-100', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '10% HCl + 5% acetic acid' },
    { k: '20-100', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '7.5% HCl + 5% acetic acid' },
    { k: '20-100', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '7.5% HCl + 5% acetic acid' },
    { k: '20-100', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '7.5% HCl + 5% acetic acid' },
    { k: '<20', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '7.5% HCl + 5% acetic acid' },
    { k: '<20', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '5% HCl + 5% acetic acid' },
    { k: '<20', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '5% HCl + 5% acetic acid' },
    { k: '<20', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', preflush: '5% HCl + 5% acetic acid' },
    { k: 'Any', clay: '<10', slit: 'Any', chloriteGlauconite: '3-6', zeolite: '0-2', preflush: '7.5% HCl + 5% acetic acid' },
    { k: 'Any', clay: '>10', slit: 'Any', chloriteGlauconite: '3-6', zeolite: '0-2', preflush: '5% HCl + 5% acetic acid' },
    { k: 'Any', clay: '<10', slit: 'Any', chloriteGlauconite: 'Any', zeolite: '>6', preflush: '10% acetic acid' },
  ];

  // Iterate through conditions and find the matching one
  for (let condition of conditions) {
    if (
      (condition.k === 'Any' || inRange(parseFloat(k), condition.k)) &&
      (condition.clay === 'Any' || inRange(parseFloat(clay), condition.clay)) &&
      (condition.slit === 'Any' || inRange(parseFloat(slit), condition.slit)) &&
      inRange(parseFloat(chloriteGlauconite), condition.chloriteGlauconite) &&
      inRange(parseFloat(zeolite), condition.zeolite)
    ) {
      return condition.preflush;
    }
  }

  return '0';
}


function getMainTreatmentFluid({
  k, clay, slit, chloriteGlauconite, zeolite
}: {
  k: string
  clay: string
  slit: string
  chloriteGlauconite: string
  zeolite: string
}) {
  const conditions = [
    { k: '>100', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '12% HCl + 3% HF' },
    { k: '>100', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '13.5% HCl + 1.5% HF' },
    { k: '>100', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '12% HCl + 2% HF' },
    { k: '>100', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '12% HCl + 2% HF' },
    { k: '20-100', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '8% HCl + 2% HF' },
    { k: '20-100', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '9% HCl + 1% HF' },
    { k: '20-100', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '9% HCl + 1.5% HF' },
    { k: '20-100', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '9% HCl + 1.5% HF' },
    { k: '<20', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '6% HCl + 1.5% HF' },
    { k: '<20', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '4.5% HCl + 0.5% HF' },
    { k: '<20', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '6% HCl + 1.5% HF' },
    { k: '<20', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0', mainTreatment: '6% HCl + 1% HF' },
    { k: '>100', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '12% HCl + 3% HF + 5% acetic acid' },
    { k: '>100', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '13.5% HCl + 1.5% HF + 5% acetic acid' },
    { k: '>100', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '12% HCl + 2% HF + 5% acetic acid' },
    { k: '>100', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '12% HCl + 2% HF + 5% acetic acid' },
    { k: '20-100', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '8% HCl + 2% HF + 5% acetic acid' },
    { k: '20-100', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '9% HCl + 1% HF + 5% acetic acid' },
    { k: '20-100', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '9% HCl + 1.5% HF + 5% acetic acid' },
    { k: '20-100', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '9% HCl + 1.5% HF + 5% acetic acid' },
    { k: '<20', clay: '<10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '6% HCl + 1.5% HF + 5% acetic acid' },
    { k: '<20', clay: '>10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '4.5% HCl + 0.5% HF + 5% acetic acid' },
    { k: '<20', clay: '>10', slit: '<10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '6% HCl + 1% HF + 5% acetic' },
    { k: '<20', clay: '<10', slit: '>10', chloriteGlauconite: '<=3', zeolite: '0-2', mainTreatment: '6% HCl + 1% HF + 5% acetic' },
    { k: '>20', clay: '<10', slit: '<10', chloriteGlauconite: '3-6', zeolite: '0-2', mainTreatment: '8% HCl + 2% HF + 5% acetic acid' },
    { k: '>20', clay: '>10', slit: '>10', chloriteGlauconite: '3-6', zeolite: '0-2', mainTreatment: '9% HCl + 1% HF + 5% acetic acid' },
    { k: '>20', clay: '>10', slit: '<10', chloriteGlauconite: '3-6', zeolite: '0-2', mainTreatment: '9% HCl + 1.5% HF + 5% acetic acid' },
    { k: '>20', clay: '<10', slit: '>10', chloriteGlauconite: '3-6', zeolite: '0-2', mainTreatment: '9% HCl + 1.5% HF + 5% acetic acid' },
    { k: '<=20', clay: '<10', slit: '<10', chloriteGlauconite: '3-6', zeolite: '0-2', mainTreatment: '6% HCl + 1.5% HF + 5% acetic acid' },
    { k: '<=20', clay: '>10', slit: '>10', chloriteGlauconite: '3-6', zeolite: '0-2', mainTreatment: '4.5% HCl + 0.5% HF + 5% acetic acid' },
    { k: '<=20', clay: '>10', slit: '<10', chloriteGlauconite: '3-6', zeolite: '0-2', mainTreatment: '6% HCl + 1% HF + 5% acetic acid' },
    { k: '<=20', clay: '<10', slit: '>10', chloriteGlauconite: '3-6', zeolite: '0-2', mainTreatment: '6% HCl + 1% HF + 5% acetic acid' },
    { k: '>20', clay: '<10', slit: '<10', chloriteGlauconite: '>6', zeolite: '0-2', mainTreatment: 'Organic clay acid HT' },
    { k: '>20', clay: '>10', slit: '>10', chloriteGlauconite: '>6', zeolite: '0-2', mainTreatment: 'Organic clay acid HT' },
    { k: '>20', clay: '>10', slit: '<10', chloriteGlauconite: '>6', zeolite: '0-2', mainTreatment: 'Organic clay acid HT' },
    { k: '>20', clay: '<10', slit: '>10', chloriteGlauconite: '>6', zeolite: '0-2', mainTreatment: 'Organic clay acid HT' },
    { k: '<=20', clay: '<10', slit: '<10', chloriteGlauconite: '>6', zeolite: '0-2', mainTreatment: 'Organic clay acid HT' },
    { k: '<=20', clay: '>10', slit: '>10', chloriteGlauconite: '>6', zeolite: '0-2', mainTreatment: 'Organic clay acid HT' },
    { k: '<=20', clay: '>10', slit: '<10', chloriteGlauconite: '>6', zeolite: '0-2', mainTreatment: 'Organic clay acid HT' },
    { k: '<=20', clay: '<10', slit: '>10', chloriteGlauconite: '>6', zeolite: '0-2', mainTreatment: 'Organic clay acid HT' },
    { k: 'Any', clay: 'Any', slit: 'Any', chloriteGlauconite: 'Any', zeolite: '2-5', mainTreatment: 'Organic clay acid' },
    { k: 'Any', clay: 'Any', slit: 'Any', chloriteGlauconite: 'Any', zeolite: '>5', mainTreatment: 'Organic clay acid HT' }
  ];

  function compare(value: number, condition: string) {
    if (condition.includes('>=')) {
      return value >= parseFloat(condition.replace('>=', '').trim());
    } else if (condition.includes('>')) {
      return value > parseFloat(condition.replace('>', '').trim());
    } else if (condition.includes('<=')) {
      return value <= parseFloat(condition.replace('<=', '').trim());
    } else if (condition.includes('<')) {
      return value < parseFloat(condition.replace('<', '').trim());
    } else if (condition.includes('Any')) {
      return true;
    } else if (condition.includes('-')) {
      const [min, max] = condition.split('-').map(Number);
      return value >= min && value <= max;
    } else {
      return value == parseFloat(condition.trim());
    }
  }

  for (const condition of conditions) {
    if (
      compare(parseFloat(k), condition.k) &&
      compare(parseFloat(clay), condition.clay) &&
      compare(parseFloat(slit), condition.slit) &&
      compare(parseFloat(chloriteGlauconite), condition.chloriteGlauconite) &&
      compare(parseFloat(zeolite), condition.zeolite)
    ) {
      return condition.mainTreatment;
    }
  }

  return '0';
}


const formulas = {
  getQAS(args: { k: string, h: string, prMinusPwf: string, u: string, Bo: string, re: string, rw: string }): string {
    const upper = 0.00708 * parseFloat(args.k) * parseFloat(args.h) * parseFloat(args.prMinusPwf)
    const lower = parseFloat(args.u) * parseFloat(args.Bo) * Math.log(parseFloat(args.re) / parseFloat(args.rw))
    return (upper / lower).toFixed(4).toString()
  },
  getQBS(args: { k: string, h: string, prMinusPwf: string, u: string, Bo: string, re: string, rw: string }): string {
    const upper = 0.00708 * parseFloat(args.k) * parseFloat(args.h) * parseFloat(args.prMinusPwf)
    const lower = parseFloat(args.u) * parseFloat(args.Bo) * Math.log(parseFloat(args.re) / parseFloat(args.rw))
    return (upper / lower).toFixed(4).toString()
  },
  getPiIdeal(args: { k: string, h: string, u: string, Bo: string, re: string, rw: string }): string {
    const upper = 0.00708 * parseFloat(args.k) * parseFloat(args.h)
    const lower = parseFloat(args.u) * parseFloat(args.Bo) * Math.log(parseFloat(args.re) / parseFloat(args.rw))
    return (upper / lower).toFixed(4).toString()
  },
  getPiBS(args: { k: string, h: string, u: string, Bo: string, re: string, rw: string, s: string }): string {
    const upper = 0.00708 * parseFloat(args.k) * parseFloat(args.h)
    const lower = parseFloat(args.u) * parseFloat(args.Bo) * Math.log(parseFloat(args.re) / parseFloat(args.rw)) + parseFloat(args.s)
    return (upper / lower).toFixed(4).toString()
  },
  getPiAS(args: { k: string, h: string, u: string, Bo: string, re: string, rw: string, s: string }): string {
    const upper = 0.00708 * parseFloat(args.k) * parseFloat(args.h)
    const lower = parseFloat(args.u) * parseFloat(args.Bo) * Math.log(parseFloat(args.re) / parseFloat(args.rw)) + parseFloat(args.s)
    return (upper / lower).toFixed(4).toString()
  },
  getDPSkinBS(args: { k: string, s: string, q: string, mu: string, B: string, h: string }): string {
    const upper = 141.2 * parseFloat(args.q) * parseFloat(args.B) * parseFloat(args.mu) * parseFloat(args.s)
    const lower = parseFloat(args.k) * parseFloat(args.h)
    return (upper / lower).toFixed(4).toString()
  },
  getFlowEfficiencyBS(args: { PIActual: string, PIIdeal: string }): string {
    return (parseFloat(args.PIActual) / parseFloat(args.PIIdeal)).toFixed(4).toString()
  },
  getDPSkinAS(args: { k: string, s: string, q: string, mu: string, B: string, h: string }): string {
    const upper = 141.2 * parseFloat(args.q) * parseFloat(args.B) * parseFloat(args.mu) * parseFloat(args.s)
    const lower = parseFloat(args.k) * parseFloat(args.h)
    return (upper / lower).toFixed(4).toString()
  },
  getFlowEfficiencyAS(args: { PIActual: string, PIIdeal: string }): string {
    return (parseFloat(args.PIActual) / parseFloat(args.PIIdeal)).toFixed(4).toString()
  },
  getAbondonmentTime(args: {
    declineCurveType: declineCurveTypeOption, Di: string, Qa: string, Qi: string
  }): string {
    switch (args.declineCurveType) {
      case 'Hyperbolic':
        return ((1 / parseFloat(args.Di)) * Math.log(Math.abs((parseFloat(args.Qi) / parseFloat(args.Qa)) - 1))).toFixed(4).toString()
      case 'Exponential':
        return ((1 / parseFloat(args.Di)) * Math.log(parseFloat(args.Qi) / parseFloat(args.Qa))).toFixed(4).toString()
      case 'Harmonical':
        return ((1 / parseFloat(args.Di)) * Math.log(Math.abs((parseFloat(args.Qi) / parseFloat(args.Qa)) - 1))).toFixed(4).toString()
    }
  },
  getCumulativeProduction(args: { declineCurveType: declineCurveTypeOption, Di: string, Qa: string, Qi: string, b: string }): string {
    switch (args.declineCurveType) {
      case 'Hyperbolic':
        return (((parseFloat(args.Qi) - parseFloat(args.Qa)) / parseFloat(args.Di)) * ((parseFloat(args.Qi) * (1 - parseFloat(args.b))) - (parseFloat(args.Qa) * (1 - parseFloat(args.b))))).toFixed(4).toString()
      case 'Exponential':
        return ((parseFloat(args.Qi) - parseFloat(args.Qa)) / parseFloat(args.Di)).toFixed(4).toString()
      case 'Harmonical':
        return ((parseFloat(args.Qi) / parseFloat(args.Di)) * Math.log(parseFloat(args.Qi) / parseFloat(args.Qa))).toFixed(4).toString()
    }
  },
  getCOF(args: COFFormulaArgs): COFResultsReturnType {
    const {
      a,
      g,
      p,
      d,
      m,
      r,
      v,
      t,
      c,
      w
    } = args

    const COF = (
      (10 * parseFloat(a))
      + (9 * parseFloat(g))
      + (8 * parseFloat(p))
      + (7 * parseFloat(d))
      + (6 * parseFloat(m))
      + (5 * parseFloat(r))
      + (4 * parseFloat(v))
      + (3 * parseFloat(t))
      + (2 * parseFloat(c))
      + (parseFloat(w))
    )

    return {
      isCOFValid: COF >= 50,
      COF,
    }
  },
  getTechnicalAnalysis(args: TechnicalAnalysisArgs): TechnicalAnalysisResultsReturnType {
    const undamagedKPercent = (((parseFloat(args.permeabilityAS) - parseFloat(args.damagedK)) * 100) / parseFloat(args.damagedK)).toFixed(4).toString()
    const undamagedSPercent = (((parseFloat(args.skinFactorAS) - parseFloat(args.skinFactor)) * 100) / parseFloat(args.skinFactor)).toFixed(4).toString()
    const RfactorAS = (parseFloat(args.PskinBS) / parseFloat(args.p)).toFixed(4).toString()
    const RfactorBS = (parseFloat(args.PskinAS) / parseFloat(args.p)).toFixed(4).toString()
    return {
      wellName: args.wellName,
      flowEffeciencyBS: args.flowEfficiencyBS,
      flowEffeciencyAS: args.flowEfficiencyAS,
      productionGain: (parseFloat(args.qAS) - parseFloat(args.qBS)).toFixed(4).toString(),
      cumulativeProduction: args.cumulativeProduction,
      undamagedKPercent,
      undamagedSPercent,
      RfactorAS,
      RfactorBS,
      abondonmentTimeMonths: (parseFloat(args.abondonmentTime) / 30).toFixed(4).toString(),
      abondonmentTimeYears: (parseFloat(args.abondonmentTime) / 365).toFixed(4).toString()
    }
  },
  getTotalCost(args: { serviceCost: string, operationalCost: string, costOfChemicals: string, durationOfWSJ: string }): string {
    return (parseFloat(args.serviceCost) + parseFloat(args.costOfChemicals) + (parseFloat(args.operationalCost) * parseFloat(args.durationOfWSJ))).toFixed(4).toString()
  },
  getTotalRevenue(args: { p: string, pg: string, ad: string }): string {
    return (parseFloat(args.p) * parseFloat(args.ad) * parseFloat(args.pg)).toFixed(4).toString()
  },
  getEBIT(args: {
    totalRevenue: string
    totalCost: string
    deprecation: string
  }) {
    const unit = parseFloat(args.totalRevenue) - parseFloat(args.totalCost)
    return (unit - (unit * (parseFloat(args.deprecation) / 100))).toFixed(4).toString()
  },
  getNPV(args: { totalCost: string, netCashFlow: string, i: string, n: string }): string {
    let sum = 0 - parseFloat(args.totalCost)

    for (let t = 1; t <= parseInt(args.n); t++) {
      sum += (parseFloat(args.netCashFlow) / parseInt(args.n)) / Math.pow((1 + parseFloat(args.i)), t)
    }

    return sum.toFixed(4).toString()
  },
  getPaybackPeriod(args: { totalCost: string, cashFlow: string }): string {
    return ((parseFloat(args.totalCost) / parseFloat(args.cashFlow)) * 360).toFixed(4).toString()
  },
  getTaxableIncome(args: {
    EBIT: string
    royalty: string
  }) {
    const unit = parseFloat(args.EBIT)
    return (unit - (unit * (parseFloat(args.royalty) / 100))).toFixed(4).toString()
  },
  getNetIncome(args: {
    taxableIncome: string
    taxes: string
  }) {
    const unit = parseFloat(args.taxableIncome)
    return (unit - (unit * (parseFloat(args.taxes) / 100))).toFixed(4).toString()
  },

  getHclYes(args: {
    k: string
    clay: string
    slit: string
    chloriteGlauconite: string
    zeolite: string
  }): HclResultsReturnType {

    const preflush = getPreflushFluid(args)
    const mainTreatment = getMainTreatmentFluid(args)

    return {
      preflush,
      mainTreatment
    }
  },
  getHclNo(args: {
    k: string
    clay: string
    slit: string
  }): HclResultsReturnType {

    const conditions = [
      { k: '>100', clay: '<10', slit: '<10', preflush: '15% HCl', mainTreatment: '12% HCl+3% HF' },
      { k: '>100', clay: '>10', slit: '>10', preflush: '10% HCl', mainTreatment: '13.5% HCl+1.5% HF' },
      { k: '>100', clay: '>10', slit: '<10', preflush: '10% HCl', mainTreatment: '12% HCl+2% HF' },
      { k: '>100', clay: '<10', slit: '>10', preflush: '10% HCl', mainTreatment: '12% HCl+2% HF' },
      { k: '20-100', clay: '<10', slit: '<10', preflush: '10% HCl', mainTreatment: '8% HCl+2% HF' },
      { k: '20-100', clay: '>10', slit: '>10', preflush: '7.5% HCl', mainTreatment: '9% HCl+1% HF' },
      { k: '20-100', clay: '>10', slit: '<10', preflush: '7.5% HCl', mainTreatment: '9% HCl+1.5% HF' },
      { k: '20-100', clay: '<10', slit: '>10', preflush: '7.5% HCl', mainTreatment: '9% HCl+1.5% HF' },
      { k: '<20', clay: '<10', slit: '<10', preflush: '7.5% HCl', mainTreatment: '6% HCl+1.5% HF' },
      { k: '<20', clay: '>10', slit: '>10', preflush: '5% HCl', mainTreatment: '4.5% HCl+1% HF' },
      { k: '<20', clay: '>10', slit: '<10', preflush: '5% HCl', mainTreatment: '6% HCl+1.5% HF' },
      { k: '<20', clay: '<10', slit: '>10', preflush: '5% HCl', mainTreatment: '6% HCl+1% HF' },
    ];

    for (let condition of conditions) {
      if (
        inRange(parseFloat(args.k), condition.k) &&
        inRange(parseFloat(args.clay), condition.clay) &&
        inRange(parseFloat(args.slit), condition.slit)
      ) {
        return {
          preflush: condition.preflush,
          mainTreatment: condition.mainTreatment
        };
      }
    }

    return { preflush: '0', mainTreatment: '0' };

  },
}

export function getResultsAfterStimulation({ permeabilityAS, reservoirThickness, pressure, viscosity, fvf, reservoirRadius, wellboreRadius, skinFactor, skinFactorAS, permeability, damagedK, q }: ResultsAfterSimulationParam): ResultsAfterSimulationReturnType {

  const qAS = formulas.getQAS({
    k: permeabilityAS,
    h: reservoirThickness,
    prMinusPwf: pressure,
    u: viscosity,
    Bo: fvf,
    re: reservoirRadius,
    rw: wellboreRadius
  })


  const qBS = formulas.getQBS({
    k: damagedK,
    h: reservoirThickness,
    prMinusPwf: pressure,
    u: viscosity,
    Bo: fvf,
    re: reservoirRadius,
    rw: wellboreRadius
  })
  const piIdeal = formulas.getPiIdeal({
    k: permeability,
    h: reservoirThickness,
    u: viscosity,
    Bo: fvf,
    re: reservoirRadius,
    rw: wellboreRadius
  })
  const piBS = formulas.getPiBS({
    k: damagedK,
    h: reservoirThickness,
    u: viscosity,
    Bo: fvf,
    re: reservoirRadius,
    rw: wellboreRadius,
    s: skinFactor
  })
  const piAS = formulas.getPiAS({
    k: permeabilityAS,
    h: reservoirThickness,
    u: viscosity,
    Bo: fvf,
    re: reservoirRadius,
    rw: wellboreRadius,
    s: skinFactorAS
  })
  const dPSkinBS = formulas.getDPSkinBS({
    k: damagedK,
    B: fvf,
    s: skinFactor,
    q: q,
    mu: viscosity,
    h: reservoirThickness,
  })
  const dPSkinAS = formulas.getDPSkinAS({
    k: permeabilityAS,
    B: fvf,
    s: skinFactorAS,
    q: qAS,
    mu: viscosity,
    h: reservoirThickness,
  })

  const flowEfficiencyBS = formulas.getFlowEfficiencyBS({
    PIActual: piBS,
    PIIdeal: piIdeal,
  })

  const flowEfficiencyAS = formulas.getFlowEfficiencyAS({
    PIActual: piAS,
    PIIdeal: piIdeal,
  })

  return {
    qAS,
    qBS,
    piIdeal,
    piBS,
    piAS,
    dPSkinBS,
    flowEfficiencyBS,
    dPSkinAS,
    flowEfficiencyAS
  }
}

export function getSecondResults({ abondonmentRate, declineCurveType, declineRate, qAS, b }: SecondResultsParam): SecondResultsReturnType {
  const abondonmentTime = formulas.getAbondonmentTime({
    declineCurveType,
    Di: declineRate,
    Qa: abondonmentRate,
    Qi: qAS
  })
  const cumulativeProduction = formulas.getCumulativeProduction({
    declineCurveType,
    Di: declineRate,
    Qa: abondonmentRate,
    Qi: qAS,
    b: b
  })
  return {
    abondonmentTime,
    cumulativeProduction
  }
}

export function getCOFResults(args: COFResultsParam): COFResultsReturnType {
  const COF = formulas.getCOF({
    a: args.gravelPackLine,
    g: args.gravelPackIndex,
    p: args.packerIndex,
    d: args.workoverDepthIndex,
    m: args.mandrelIndex,
    r: args.ageOfLastReentry,
    v: args.angleOfDeviation,
    t: args.lostWirelineIndex,
    c: args.casingPatchIndex,
    w: args.wellheadRepairIndex,
  })
  return COF
}

export const getTechnicalAnalysisResults = (args: TechnicalAnalysisResultsParam[]): TechnicalAnalysisResultsReturnType[] => args.map(item => {
  return formulas.getTechnicalAnalysis({
    wellName: item.wellName,
    permeabilityAS: item.permeabilityAS,
    damagedK: item.damagedK,
    skinFactorAS: item.skinFactorAS,
    skinFactor: item.skinFactor,
    qAS: item.qAS,
    qBS: item.qBS,
    flowEfficiencyBS: item.flowEfficiencyBS,
    flowEfficiencyAS: item.flowEfficiencyAS,
    PskinBS: item.dpSkinBS,
    p: item.pressure,
    PskinAS: item.dpSkinAS,
    cumulativeProduction: item.cumulativeProduction,
    abondonmentTime: item.abondonmentTime,
  })
})

export function getEconomicDataResults({ queriedWellName, costOfChemicals, operationalCost, serviceCost, priceOfOil, royalty, taxes, discountRate, initialInvestment, deprecation, durationOfWSJ }: EconomicDataResultsParam): EconomicDataResultsReturnType {
  const inputStore = useInputStore()

  const queriedWell = inputStore.wells.find(well => well.wellName === queriedWellName)

  if (!queriedWell) {
    alert('Well name not found')
    throw new Error('Well name not found')
  }

  const totalCost = formulas.getTotalCost({
    costOfChemicals,
    serviceCost,
    operationalCost,
    durationOfWSJ,
  })

  const queriedTechnicalAnalysisResults = inputStore.technicalAnalysisResults.find(techAnal => techAnal.wellName === queriedWellName)

  if (!queriedTechnicalAnalysisResults) {
    alert('Well name not found')
    throw new Error('Well name not found')
  }

  const totalRevenue = formulas.getTotalRevenue({
    p: priceOfOil,
    pg: queriedTechnicalAnalysisResults.productionGain,
    ad: queriedWell.secondResults.abondonmentTime,
  })

  const EBIT = formulas.getEBIT({
    totalRevenue,
    totalCost,
    deprecation
  })

  const taxableIncome = formulas.getTaxableIncome({
    EBIT,
    royalty
  })

  const netIncome = formulas.getNetIncome({
    taxableIncome,
    taxes,
  })

  const netCashFlow = (parseFloat(totalRevenue) - parseFloat(totalCost)).toFixed(4).toString()

  const npv = formulas.getNPV({
    netCashFlow,
    totalCost,
    i: (parseFloat(discountRate) / 100).toFixed(4).toString(),
    n: Math.round(parseFloat(queriedTechnicalAnalysisResults.abondonmentTimeYears)).toString(),
  })

  const paybackPeriod = formulas.getPaybackPeriod({
    totalCost,
    cashFlow: (parseFloat(netCashFlow) / parseFloat(queriedTechnicalAnalysisResults.abondonmentTimeYears)).toFixed(4).toString(),
  })


  return {
    totalCost,
    totalRevenue,
    netCashFlow,
    taxableIncome,
    netIncome,
    EBIT,
    npv,
    paybackPeriod
  }

}


export function getHclResults({ zeolite, chlorite, feldspars, glauconite, hclType, illite, k_md, kaolinite, mica, mixedLayer, smectite }: HclResultsParam): HclResultsReturnType {
  const slit = (parseFloat(mica) + parseFloat(feldspars)).toFixed(4).toString()
  const clay = (parseFloat(zeolite)
    + parseFloat(kaolinite)
    + parseFloat(mixedLayer)
    + parseFloat(illite)
    + parseFloat(smectite)
    + parseFloat(chlorite)
    + parseFloat(glauconite))
    .toFixed(4)
    .toString();

  switch (hclType) {
    case 'Yes':
      return formulas.getHclYes({
        chloriteGlauconite: (parseFloat(chlorite) + parseFloat(glauconite)).toFixed(4).toString(),
        clay,
        k: k_md,
        slit,
        zeolite,
      })
    case 'No':
      return formulas.getHclNo({
        k: k_md,
        slit,
        clay
      })
  }
}
