export type declineCurveTypeOption = 'Exponential' | 'Harmonical' | 'Hyperbolic'

type ResultsAfterSimulationReturnType = {
  qAS: string,
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

type SecondResultsReturnType = {
  abondonmentTime: string
  cumulativeProduction: string
}

const formulas = {
  getQAS(args: { k: string, h: string, prMinusPwf: string, u: string, Bo: string, re: string, rw: string }): string {
    const upper = 0.00708 * parseInt(args.k) * parseInt(args.h) * parseInt(args.prMinusPwf)
    const lower = parseInt(args.u) * parseInt(args.Bo) * Math.log(parseInt(args.re) / parseInt(args.rw))
    return Math.round(upper / lower).toFixed(2).toString()
  },
  getPiIdeal(args: { k: string, h: string, u: string, Bo: string, re: string, rw: string }): string {
    const upper = 0.00708 * parseInt(args.k) * parseInt(args.h)
    const lower = parseInt(args.u) * parseInt(args.Bo) * Math.log(parseInt(args.re) / parseInt(args.rw))
    return Math.round(upper / lower).toFixed(2).toString()
  },
  getPiBS(args: { k: string, h: string, u: string, Bo: string, re: string, rw: string, s: string }): string {
    const upper = 0.00708 * parseInt(args.k) * parseInt(args.h)
    const lower = parseInt(args.u) * parseInt(args.Bo) * Math.log(parseInt(args.re) / parseInt(args.rw)) + parseInt(args.s)
    return Math.round(upper / lower).toFixed(2).toString()
  },
  getPiAS(args: { k: string, h: string, u: string, Bo: string, re: string, rw: string, s: string }): string {
    const upper = 0.00708 * parseInt(args.k) * parseInt(args.h)
    const lower = parseInt(args.u) * parseInt(args.Bo) * Math.log(parseInt(args.re) / parseInt(args.rw)) + parseInt(args.s)
    return Math.round(upper / lower).toFixed(2).toString()
  },
  getDPSkinBS(args: { k: string, s: string, q: string, mu: string, B: string, h: string }): string {
    const upper = 141.2 * parseInt(args.q) * parseInt(args.B) * parseInt(args.mu) * parseInt(args.s)
    const lower = parseInt(args.k) * parseInt(args.h)
    return Math.round(upper / lower).toFixed(2).toString()
  },
  getFlowEfficiencyBS(args: { PIActual: string, PIIdeal: string }): string {
    return Math.round(parseInt(args.PIActual) / parseInt(args.PIIdeal)).toFixed(2).toString()
  },
  getDPSkinAS(args: { k: string, s: string, q: string, mu: string, B: string, h: string }): string {
    const upper = 141.2 * parseInt(args.q) * parseInt(args.B) * parseInt(args.mu) * parseInt(args.s)
    const lower = parseInt(args.k) * parseInt(args.h)
    return Math.round(upper / lower).toFixed(2).toString()
  },
  getFlowEfficiencyAS(args: { PIActual: string, PIIdeal: string }): string {
    return Math.round(parseInt(args.PIActual) / parseInt(args.PIIdeal)).toFixed(2).toString()
  },
  getAbondonmentTime(args: {
    declineCurveType: declineCurveTypeOption, Di: string, Qa: string, Qi: string
  }): string {
    switch (args.declineCurveType) {
      case 'Hyperbolic':
        return Math.round((1 / parseInt(args.Di)) * Math.log((parseInt(args.Qi) / parseInt(args.Qa)) - 1)).toFixed(2).toString()
      case 'Exponential':
        return Math.round((1 / parseInt(args.Di)) * Math.log(parseInt(args.Qi) / parseInt(args.Qa))).toFixed(2).toString()
      case 'Harmonical':
        return Math.round((1 / parseInt(args.Di)) * Math.log((parseInt(args.Qi) / parseInt(args.Qa)) - 1)).toFixed(2).toString()
    }
  },
  getCumulativeProduction(args: { declineCurveType: declineCurveTypeOption, Di: string, Qa: string, Qi: string, b: string }): string {
    switch (args.declineCurveType) {
      case 'Hyperbolic':
        return Math.round(((parseInt(args.Qi) - parseInt(args.Qa)) / parseInt(args.Di)) * ((parseInt(args.Qi) * (1 - parseInt(args.b))) - (parseInt(args.Qa) * (1 - parseInt(args.b))))).toFixed(2).toString()
      case 'Exponential':
        return Math.round((parseInt(args.Qi) - parseInt(args.Qa)) / parseInt(args.Di)).toFixed(2).toString()
      case 'Harmonical':
        return Math.round((parseInt(args.Qi) / parseInt(args.Di)) * Math.log(parseInt(args.Qi) / parseInt(args.Qa))).toFixed(2).toString()
    }
  }
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
  console.log('hello')
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