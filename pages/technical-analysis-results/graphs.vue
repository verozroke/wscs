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
      <v-card-title>Ranking of wells by Cumulative Production</v-card-title>
      <v-sheet color="rgba(0, 0, 0, .08)">
        <v-sparkline
          :model-value="cumulativeProductionValues"
          color="purple-lighten-1"
          height="100"
          padding="40"
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
      <v-card-title>Ranking of wells by Production Gain</v-card-title>
      <v-sheet color="rgba(0, 0, 0, .08)">
        <v-sparkline
          :model-value="productionGainValues"
          color="purple-lighten-1"
          height="100"
          padding="40"
        >
          <template
            style="font-size: 16px; margin: 0 20px;"
            v-slot:label="item"
          >
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
      <v-card-title>Ranking of wells by R-factor</v-card-title>
      <v-sheet color="rgba(0, 0, 0, .08)">
        <v-sparkline
          :model-value="RfactorBSValues"
          color="purple-lighten-1"
          height="100"
          padding="40"
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
      <v-card-title>Ranking of wells by Time of Abandonment</v-card-title>
      <v-sheet color="rgba(0, 0, 0, .08)">
        <v-sparkline
          :model-value="abondonmentTimeYearsValues"
          color="purple-lighten-1"
          height="100"
          padding="40"
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
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
    .sort((a, b) => parseFloat(a.cumulativeProduction) + parseFloat(b.cumulativeProduction))
    .map(item => parseFloat(item.cumulativeProduction))
))

const productionGainValues = computed(() => (
  inputStore.technicalAnalysisResults
    .map(item => parseFloat(item.productionGain))
))

const RfactorBSValues = computed(() => (
  inputStore.technicalAnalysisResults
    .map(item => parseFloat(item.RfactorBS))
))

const abondonmentTimeYearsValues = computed(() => (
  inputStore.technicalAnalysisResults
    .map(item => parseFloat(item.abondonmentTimeYears))
))
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