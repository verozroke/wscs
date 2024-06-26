import { defineStore } from 'pinia'
import { getResultsAfterStimulation, getSecondResults, getCOFResults, getEconomicDataResults, type TechnicalAnalysisResultsReturnType, getHclResults } from '../utils/formulas'
import { useRouter } from 'vue-router'

type Well = {
  wellName: string
  wellType: string
  pressure: string
  viscosity: string
  wellboreRadius: string
  reservoirThickness: string
  fvf: string
  skinFactor: string
  permeability: string
  reservoirRadius: string
  damagedK: string
  q: string
  skinFactorAS: string
  permeabilityAS: string
  declineCurveType: declineCurveTypeOption
  declineRate: string
  abondonmentRate: string
  b: string
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
  priceOfOil: string
  serviceCost: string
  operationalCost: string
  costOfChemicals: string
  initialInvestment: string
  discountRate: string
  taxes: string
  royalty: string
  results: ResultsAfterSimulationReturnType
  secondResults: SecondResultsReturnType
  COFResults: COFResultsReturnType
  economicDataResults: EconomicDataResultsReturnType
  technicalAnalysisResults: TechnicalAnalysisResultsReturnType[]
}

type EconomicDataResultsItem = {
  wellName: string
  totalCost: string
  totalRevenue: string
  EBIT: string
  taxableIncome: string
  netIncome: string
  netCashFlow: string
  npv: string
  paybackPeriod: string
}

export const useInputStore = defineStore('InputStore', () => {
  const router = useRouter()

  const wellName = ref('')
  const wellType = ref('')
  const pressure = ref('')
  const viscosity = ref('')
  const wellboreRadius = ref('')
  const reservoirThickness = ref('')
  const fvf = ref('')
  const skinFactor = ref('')
  const permeability = ref('')
  const reservoirRadius = ref('')
  const damagedK = ref('')
  const q = ref('')
  const skinFactorAS = ref('')
  const permeabilityAS = ref('')

  const declineCurveType = ref<declineCurveTypeOption>('Exponential')
  const declineRate = ref('')
  const abondonmentRate = ref('')
  const b = ref('0')

  const gravelPackLine = ref('')
  const gravelPackIndex = ref('')
  const packerIndex = ref('')
  const workoverDepthIndex = ref('')
  const mandrelIndex = ref('')
  const ageOfLastReentry = ref('')
  const angleOfDeviation = ref('')
  const lostWirelineIndex = ref('')
  const casingPatchIndex = ref('')
  const wellheadRepairIndex = ref('')

  const priceOfOil = ref('')
  const serviceCost = ref('')
  const durationOfWSJ = ref('')
  const deprecation = ref('')
  const operationalCost = ref('')
  const costOfChemicals = ref('')
  const initialInvestment = ref('')
  const discountRate = ref('')
  const taxes = ref('')
  const royalty = ref('')
  const queriedWellName = ref('')

  const hclType = ref<'Yes' | 'No'>('No')
  const k_md = ref('')
  const mica = ref('')
  const feldspars = ref('')
  const kaolinite = ref('')
  const mixedLayer = ref('')
  const illite = ref('')
  const smectite = ref('')
  const chlorite = ref('')
  const glauconite = ref('')
  const zeolite = ref('')

  const wells = ref<Well[]>([])

  const economicDataResultsGraphs = ref<EconomicDataResultsItem[]>([])

  const results = ref({
    qAS: '',
    qBS: '',
    piIdeal: '',
    piBS: '',
    piAS: '',
    dPSkinBS: '',
    flowEfficiencyBS: '',
    dPSkinAS: '',
    flowEfficiencyAS: ''
  })

  const secondResults = ref({
    abondonmentTime: '',
    cumulativeProduction: ''
  })

  const COFResults = ref<{
    isCOFValid: boolean | null
    COF: number
  }>({
    isCOFValid: null,
    COF: 0,
  })



  const technicalAnalysisResults = ref<TechnicalAnalysisResultsReturnType[]>([])

  const economicDataResults = ref({
    totalCost: '',
    totalRevenue: '',
    EBIT: '',
    taxableIncome: '',
    netIncome: '',
    netCashFlow: '',
    npv: '',
    paybackPeriod: '',
  })

  const hclResults = ref({
    preflush: '',
    mainTreatment: ''
  })

  const getAfterStimulationValues = () => {
    return {
      wellName: wellName.value,
      wellType: wellType.value,
      pressure: pressure.value,
      viscosity: viscosity.value,
      wellboreRadius: wellboreRadius.value,
      reservoirThickness: reservoirThickness.value,
      fvf: fvf.value,
      skinFactor: skinFactor.value,
      permeability: permeability.value,
      reservoirRadius: reservoirRadius.value,
      damagedK: damagedK.value,
      q: q.value,
      skinFactorAS: skinFactorAS.value,
      permeabilityAS: permeabilityAS.value,
    }
  }
  const getSecondValues = () => {
    return {
      declineCurveType: declineCurveType.value,
      declineRate: declineRate.value,
      abondonmentRate: abondonmentRate.value,
      b: b.value,
      qAS: results.value.qAS
    }
  }

  const getCOFValues = () => {
    return {
      gravelPackLine: gravelPackLine.value,
      gravelPackIndex: gravelPackIndex.value,
      packerIndex: packerIndex.value,
      workoverDepthIndex: workoverDepthIndex.value,
      mandrelIndex: mandrelIndex.value,
      ageOfLastReentry: ageOfLastReentry.value,
      angleOfDeviation: angleOfDeviation.value,
      lostWirelineIndex: lostWirelineIndex.value,
      casingPatchIndex: casingPatchIndex.value,
      wellheadRepairIndex: wellheadRepairIndex.value
    }
  }

  const getTechnicalAnalysisValues = () => wells.value.map(well => ({
    wellName: well.wellName,
    permeabilityAS: well.permeabilityAS,
    damagedK: well.damagedK,
    skinFactorAS: well.skinFactorAS,
    skinFactor: well.skinFactor,
    qAS: well.results.qAS,
    qBS: well.results.qBS,
    flowEfficiencyBS: well.results.flowEfficiencyBS,
    flowEfficiencyAS: well.results.flowEfficiencyAS,
    dpSkinBS: well.results.dPSkinBS,
    pressure: well.pressure,
    dpSkinAS: well.results.dPSkinAS,
    cumulativeProduction: well.secondResults.cumulativeProduction,
    abondonmentTime: well.secondResults.abondonmentTime,
  }))

  const getEconomicDataValues = () => {
    return {
      priceOfOil: priceOfOil.value,
      serviceCost: serviceCost.value,
      operationalCost: operationalCost.value,
      costOfChemicals: costOfChemicals.value,
      deprecation: deprecation.value,
      durationOfWSJ: durationOfWSJ.value,
      initialInvestment: initialInvestment.value,
      discountRate: discountRate.value,
      taxes: taxes.value,
      royalty: royalty.value,
    }
  }


  const getHclValues = () => {
    return {
      hclType: hclType.value,
      k_md: k_md.value,
      mica: mica.value,
      feldspars: feldspars.value,
      kaolinite: kaolinite.value,
      mixedLayer: mixedLayer.value,
      illite: illite.value,
      smectite: smectite.value,
      chlorite: chlorite.value,
      glauconite: glauconite.value,
      zeolite: zeolite.value,
    }
  }

  const addNewWell = () => {
    if (!wellName.value) {
      return
    }

    wells.value.push({
      ...getAfterStimulationValues(),
      ...getCOFValues(),
      ...getSecondValues(),
      ...getTechnicalAnalysisValues(),
      ...getEconomicDataValues(),
      results: results.value,
      secondResults: secondResults.value,
      COFResults: COFResults.value,
      economicDataResults: economicDataResults.value,
      technicalAnalysisResults: technicalAnalysisResults.value
    })
    clearValuesAndResults()
  }

  const clearValuesAndResults = () => {
    results.value = {
      qAS: '',
      qBS: '',
      piIdeal: '',
      piBS: '',
      piAS: '',
      dPSkinBS: '',
      flowEfficiencyBS: '',
      dPSkinAS: '',
      flowEfficiencyAS: ''
    }

    secondResults.value = {
      abondonmentTime: '',
      cumulativeProduction: ''
    }

    COFResults.value = {
      isCOFValid: null,
      COF: 0
    }

    economicDataResults.value = {
      totalCost: '',
      totalRevenue: '',
      EBIT: '',
      taxableIncome: '',
      netIncome: '',
      netCashFlow: '',
      npv: '',
      paybackPeriod: '',
    }

    wellName.value = ''
    wellType.value = ''
    pressure.value = ''
    viscosity.value = ''
    wellboreRadius.value = ''
    reservoirThickness.value = ''
    fvf.value = ''
    skinFactor.value = ''
    permeability.value = ''
    reservoirRadius.value = ''
    damagedK.value = ''
    q.value = ''
    skinFactorAS.value = ''
    permeabilityAS.value = ''
    declineCurveType.value = 'Exponential'
    declineRate.value = ''
    abondonmentRate.value = ''
    b.value = '0'
    gravelPackLine.value = ''
    gravelPackIndex.value = ''
    packerIndex.value = ''
    workoverDepthIndex.value = ''
    mandrelIndex.value = ''
    ageOfLastReentry.value = ''
    angleOfDeviation.value = ''
    lostWirelineIndex.value = ''
    casingPatchIndex.value = ''
    wellheadRepairIndex.value = ''
    priceOfOil.value = ''
    serviceCost.value = ''
    operationalCost.value = ''
    costOfChemicals.value = ''
    initialInvestment.value = ''
    discountRate.value = ''
    taxes.value = ''
    royalty.value = ''

    hclType.value = 'No'
    k_md.value = ''
    mica.value = ''
    feldspars.value = ''
    kaolinite.value = ''
    mixedLayer.value = ''
    illite.value = ''
    smectite.value = ''
    chlorite.value = ''
    glauconite.value = ''
    zeolite.value = ''

    hclResults.value = {
      mainTreatment: '',
      preflush: '',
    }
  }

  const calculateTechnicalAnalysisResults = () => {
    technicalAnalysisResults.value = getTechnicalAnalysisResults(getTechnicalAnalysisValues())
  }

  const calculateResultsAfterSimulation = () => {
    results.value = getResultsAfterStimulation(getAfterStimulationValues())
  }

  const calculateSecondResultsResults = () => {
    secondResults.value = getSecondResults(getSecondValues())
  }

  const calculateComplexityFactor = () => {
    COFResults.value = getCOFResults(getCOFValues())
  }

  const calculateHclResults = () => {
    hclResults.value = getHclResults(getHclValues())
  }

  const calculateEconomicDataResults = () => {
    economicDataResults.value = getEconomicDataResults({ ...getEconomicDataValues(), queriedWellName: queriedWellName.value })
    console.log(economicDataResults.value)
    const queriedResultIndex = economicDataResultsGraphs.value.findIndex(item => item.wellName === queriedWellName.value)

    if (queriedResultIndex === -1) {
      economicDataResultsGraphs.value.push({
        ...economicDataResults.value,
        wellName: queriedWellName.value
      })
    } else {
      economicDataResultsGraphs.value[queriedResultIndex] = {
        ...economicDataResults.value,
        wellName: queriedWellName.value
      }
    }

  }

  return {
    wellName,
    wellType,
    pressure,
    viscosity,
    wellboreRadius,
    reservoirThickness,
    fvf,
    skinFactor,
    permeability,
    reservoirRadius,
    damagedK,
    q,
    skinFactorAS,
    permeabilityAS,
    results,
    secondResults,
    declineCurveType,
    declineRate,
    abondonmentRate,
    b,

    gravelPackLine,
    gravelPackIndex,
    packerIndex,
    workoverDepthIndex,
    mandrelIndex,
    ageOfLastReentry,
    angleOfDeviation,
    lostWirelineIndex,
    casingPatchIndex,
    wellheadRepairIndex,
    technicalAnalysisResults,
    priceOfOil,
    serviceCost,
    operationalCost,
    costOfChemicals,
    initialInvestment,
    discountRate,
    taxes,
    royalty,
    queriedWellName,
    deprecation,
    durationOfWSJ,
    calculateResultsAfterSimulation,
    calculateSecondResultsResults,
    calculateComplexityFactor,
    COFResults,
    wells,
    addNewWell,
    calculateTechnicalAnalysisResults,
    calculateEconomicDataResults,
    economicDataResults,
    economicDataResultsGraphs,

    hclType,
    k_md,
    mica,
    feldspars,
    kaolinite,
    mixedLayer,
    illite,
    smectite,
    chlorite,
    glauconite,
    zeolite,
    hclResults,
    calculateHclResults
  }
}, {
  persist: {
    storage: localStorage,
  }
})