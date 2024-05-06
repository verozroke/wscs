<template>
  <div>
    <v-app-bar
      color="purple-lighten-1"
      :elevation="2"
    >
      <template v-slot:prepend>
        <v-btn
          icon="mdi-home"
          @click="router.push('/')"
        ></v-btn>
      </template>
      <v-app-bar-title>Complexity Factor Calculation</v-app-bar-title>
    </v-app-bar>
    <main class="body">
      <div class="row">

        <v-text-field
          variant="solo"
          class="input"
          label="Gravel pack line"
          v-model="inputStore.gravelPackLine"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Gravel pack index"
          v-model="inputStore.gravelPackIndex"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Packer index"
          v-model="inputStore.packerIndex"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Workover depth index"
          v-model="inputStore.workoverDepthIndex"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Mandrel index"
          v-model="inputStore.mandrelIndex"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Age of last re-entry"
          v-model="inputStore.ageOfLastReentry"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Angle of deviation"
          v-model="inputStore.angleOfDeviation"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Lost wireline index"
          v-model="inputStore.lostWirelineIndex"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Casing patch index"
          v-model="inputStore.casingPatchIndex"
        ></v-text-field>
        <v-text-field
          variant="solo"
          class="input"
          label="Wellhead repair index"
          v-model="inputStore.wellheadRepairIndex"
        ></v-text-field>

      </div>

      <div style="display: flex; align-items: center; gap: 10px; margin: 10px 0">
        <v-btn
          @click="inputStore.calculateComplexityFactor"
          color="green"
          style="width: 200px"
          prepend-icon="mdi-calculator"
        >
          Calculate
        </v-btn>
        <v-chip
          v-if="!(inputStore.COFResults.isCOFValid === null)"
          color="green"
          style="width: 100px; display: flex; align-items: center; justify-content: center;"
        >
          {{ COFValue }}
        </v-chip>
        <h3 v-if="!(inputStore.COFResults.isCOFValid === null)">{{ COFRecommendation }}</h3>
      </div>
      <div class="actions">
        <v-btn
          prepend-icon="mdi-water-plus"
          color="purple-lighten-1"
          @click="addNewWell"
        >
          Add ned well
        </v-btn>
        <v-btn
          append-icon="mdi-google-analytics"
          color="purple-lighten-1"
          @click="goToTechAnal"
        >
          Techinal Analysis
        </v-btn>
      </div>
    </main>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { useRouter } from 'vue-router';
import { useInputStore } from '~/stores/InputStore'

const router = useRouter()
const inputStore = useInputStore()

const COFValue = computed(() => inputStore.COFResults.isCOFValid ? 'COF > 50' : 'COF < 50')

const COFRecommendation = computed(() => (
  inputStore.COFResults.isCOFValid
    ? 'Further risk-analysis and decision making is recommended.'
    : 'Coiled tubing is recommended.'
))

const addNewWell = () => {
  inputStore.addNewWell()
  router.push('/')
}


const goToTechAnal = () => {
  inputStore.addNewWell()
  router.push('/technical-analysis-results')
}


</script>

<style
  lang="scss"
  scoped
>
.body {
  padding: 100px 45px;
  background-color: #FFF8E1;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.row {
  width: 100%;
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}

.input {
  width: 350px;
}

.actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>