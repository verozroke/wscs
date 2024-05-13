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
        :data="totalRevenueValues.sort((a, b) => b.data - a.data)"
        label="Ranking of wells by Total Revenue"
        x-axis-title="Total Revenue"
      />
      <BarChart
        :data="netIncomeValues.sort((a, b) => b.data - a.data)"
        label="Ranking of wells by Net Income"
        x-axis-title="Net Income"
      />
      <BarChart
        :data="paybackPeriodValues.sort((a, b) => b.data - a.data)"
        label="Ranking of wells by Payback Period"
        x-axis-title="Payback Period"
      />
      <BarChart
        :data="npvValues.sort((a, b) => b.data - a.data)"
        label="Ranking of wells by NPV"
        x-axis-title="NPV"
      />
      <div class="actions">
        <v-btn
          prepend-icon="mdi-arrow-left"
          color="purple-lighten-1"
          @click="router.push('/input-economic-data')"
        >
          Back
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

const totalRevenueValues = computed(() => (
  inputStore.economicDataResultsGraphs
    .map(item => ({ wellName: item.wellName, data: parseFloat(item.totalRevenue) }))
))

const netIncomeValues = computed(() => (
  inputStore.economicDataResultsGraphs
    .map(item => ({ wellName: item.wellName, data: parseFloat(item.netIncome) }))
))



const paybackPeriodValues = computed(() => (
  inputStore.economicDataResultsGraphs
    .map(item => ({ wellName: item.wellName, data: parseFloat(item.paybackPeriod) }))
))

const npvValues = computed(() => (
  inputStore.economicDataResultsGraphs
    .map(item => ({ wellName: item.wellName, data: parseFloat(item.npv) }))
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