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
    return (parseFloat(args.serviceCost) + parseFloat(args.operationalCost) + (parseFloat(args.costOfChemicals) * parseFloat(args.durationOfWSJ))).toFixed(4).toString()
  },
  getTotalRevenue(args: { p: string, pg: string, ad: string }): string {
    return (parseFloat(args.p) * parseFloat(args.pg) * parseFloat(args.ad)).toFixed(4).toString()
  },
  getEBIT(args: {
    totalRevenue: string
    totalCost: string
    deprecation: string
  }) {
    return (parseFloat(args.totalRevenue) - parseFloat(args.totalCost) - parseFloat(args.deprecation)).toFixed(4).toString()
  },
  getNPV(args: { netCashFlow: string, i: string, n: string, abandonmentTime: string }): string {
    let sum = 0

    for (let t = 1; t <= parseFloat(args.n); t++) {
      sum += (parseFloat(args.netCashFlow) / parseFloat(args.abandonmentTime)) / Math.pow((1 + parseFloat(args.i)), parseFloat(args.n))
    }

    return sum.toFixed(4).toString()
  },
  getPaybackPeriod(args: { totalCost: string, cashFlow: string }): string {
    return ((parseFloat(args.totalCost) / parseFloat(args.cashFlow)) * 12 * 30).toFixed(4).toString()
  },
  getTaxableIncome(args: {
    EBIT: string
    royalty: string
  }) {
    return (parseFloat(args.EBIT) - parseFloat(args.royalty)).toFixed(4).toString()
  },
  getNetIncome(args: {
    taxableIncome: string
    taxes: string
  }) {
    return (parseFloat(args.taxableIncome) - parseFloat(args.taxes)).toFixed(4).toString()
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
    i: discountRate,
    n: queriedTechnicalAnalysisResults.abondonmentTimeYears,
    abandonmentTime: queriedWell.secondResults.abondonmentTime
  })

  const paybackPeriod = formulas.getPaybackPeriod({
    totalCost,
    cashFlow: (parseFloat(netCashFlow) / parseFloat(queriedWell.secondResults.abondonmentTime)).toFixed(4).toString(),
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
