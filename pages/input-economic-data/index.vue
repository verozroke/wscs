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
      <v-app-bar-title>Input Economic Data</v-app-bar-title>
    </v-app-bar>
    <main class="body">

      <div class="row">
        <v-text-field
          variant="solo"
          class="input"
          label="Well name"
          v-model="inputStore.queriedWellName"
        ></v-text-field>


        <v-text-field
          variant="solo"
          class="input"
          label="Price of oil"
          suffix="$"
          v-model="inputStore.priceOfOil"
        ></v-text-field>


        <v-text-field
          variant="solo"
          class="input"
          label="Service cost"
          suffix="$"
          v-model="inputStore.serviceCost"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Operational cost"
          suffix="$"
          v-model="inputStore.operationalCost"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Cost of chemicals"
          suffix="$"
          v-model="inputStore.costOfChemicals"
        ></v-text-field>

        <!-- <v-text-field
          variant="solo"
          class="input"
          label="Initial investment"
          suffix="$"
          v-model="inputStore.initialInvestment"
        ></v-text-field> -->
        <v-text-field
          variant="solo"
          class="input"
          label="Duration of well stimulation job"
          suffix="days"
          v-model="inputStore.durationOfWSJ"
        ></v-text-field>
        <v-text-field
          variant="solo"
          class="input"
          label="Discount rate"
          suffix="%"
          v-model="inputStore.discountRate"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Taxes"
          suffix="%"
          v-model="inputStore.taxes"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Royalty"
          suffix="%"
          v-model="inputStore.royalty"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Deprecation"
          suffix="%"
          v-model="inputStore.deprecation"
        ></v-text-field>
      </div>
      <v-btn
        @click="inputStore.calculateEconomicDataResults"
        color="green"
        style="width: 200px;"
        prepend-icon="mdi-calculator"
      >
        Calculate
      </v-btn>
      <div class="row">
        <v-text-field
          variant="solo"
          class="input"
          label="Total cost"
          suffix="$"
          readonly
          v-model="inputStore.economicDataResults.totalCost"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Total revenue"
          suffix="$"
          readonly
          v-model="inputStore.economicDataResults.totalRevenue"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="EBIT"
          suffix="$"
          readonly
          v-model="inputStore.economicDataResults.EBIT"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Taxable Income"
          suffix="$"
          readonly
          v-model="inputStore.economicDataResults.taxableIncome"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Net Income"
          suffix="$"
          readonly
          v-model="inputStore.economicDataResults.netIncome"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Net Cash Flow"
          suffix="$"
          readonly
          v-model="inputStore.economicDataResults.netCashFlow"
        ></v-text-field>

        <!-- <v-text-field
          variant="solo"
          class="input"
          label="Profitability index"
          readonly
          v-model="inputStore.economicDataResults.profitabilityIndex"
        ></v-text-field> -->

        <v-text-field
          variant="solo"
          class="input"
          label="Net present value of future cash flow"
          readonly
          suffix="$"
          v-model="inputStore.economicDataResults.npv"
        ></v-text-field>
        <v-text-field
          variant="solo"
          class="input"
          label="Payback Period"
          suffix="days"
          readonly
          v-model="inputStore.economicDataResults.paybackPeriod"
        ></v-text-field>

      </div>
      <div class="actions">
        <v-btn
          prepend-icon="mdi-arrow-left"
          color="purple-lighten-1"
          @click="router.push('/technical-analysis-results/graphs')"
        >
          Back
        </v-btn>
        <v-btn
          append-icon="mdi-arrow-right"
          color="purple-lighten-1"
          @click="router.push('/input-economic-data/graphs')"
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