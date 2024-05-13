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
      <v-app-bar-title>Technical Analysis Results</v-app-bar-title>
    </v-app-bar>
    <main class="body">
      <BarChart
        :data="cumulativeProductionValues.sort((a, b) => b.data - a.data)"
        label="Ranking of wells by Cumulative Production"
        x-axis-title="Cumulative Production, bbl"
      />
      <BarChart
        :data="productionGainValues.sort((a, b) => b.data - a.data)"
        label="Ranking of wells by Production Gain, bbl/day"
        x-axis-title="Production Gain"
      />
      <BarChart
        :data="abondonmentTimeYearsValues.sort((a, b) => b.data - a.data)"
        label="Ranking of wells by Time of Abandonment"
        x-axis-title="Time of Abandonment, years"
      />
      <div class="actions">
        <v-btn
          prepend-icon="mdi-arrow-left"
          color="purple-lighten-1"
          @click="router.push('/technical-analysis-results')"
        >
          Back
        </v-btn>
        <v-btn
          append-icon="mdi-arrow-right"
          color="purple-lighten-1"
          @click="router.push('/input-economic-data')"
        >
          Next
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

const cumulativeProductionValues = computed(() => (
  inputStore.technicalAnalysisResults
    .map(item => ({ wellName: item.wellName, data: parseFloat(item.cumulativeProduction) }))
))

const productionGainValues = computed(() => (
  inputStore.technicalAnalysisResults
    .map(item => ({ wellName: item.wellName, data: parseFloat(item.productionGain) }))
))



const abondonmentTimeYearsValues = computed(() => (
  inputStore.technicalAnalysisResults
    .map(item => ({ wellName: item.wellName, data: parseFloat(item.abondonmentTimeYears) }))
))
</script>

<style
  lang="scss"
  scoped
>
.body {
  padding: 100px 45px;
  background-color: rgb(248 250 252);
  width: 100vw;
  height: 100vh;
  display: flex;
  gap: 30px;
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