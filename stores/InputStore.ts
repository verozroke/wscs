import { defineStore } from 'pinia'

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

  const calculateResultsAfterSimulation = () => {

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



    calculateResultsAfterSimulation,
  }
}, {
  persist: true
})