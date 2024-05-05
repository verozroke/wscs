import { defineStore } from 'pinia'
import { getResultsAfterStimulation } from '../utils/formulas'

export const useInputStore = defineStore('InputStore', () => {
  const wellName = ref('dfdfdf')
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


  const results = ref({
    qAS: '',
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


  const calculateResultsAfterSimulation = () => {
    results.value = getResultsAfterStimulation(getAfterStimulationValues())
  }

  const calculateSecondResultsResults = () => {
    secondResults.value = getSecondResults(getSecondValues())
  }

  const calculateComplexityFactor = () => {

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

    calculateResultsAfterSimulation,
    calculateSecondResultsResults,
    calculateComplexityFactor
  }
}, {
  persist: true
})