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
      <v-card-title>Workover complexity analysis</v-card-title>
      <div style="display: flex; gap: 20px">
        <div>
          <v-card-subtitle style="font-size: 24px;">Wells with Easy workover</v-card-subtitle>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Well Name
                </th>
                <th class="text-left">
                  COF
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in wellsWithEasy"
                :key="item.wellName"
              >
                <td>{{ item.wellName }}</td>
                <td>{{ item.COF }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <div>
          <v-card-subtitle style="font-size: 24px;">Wells with Difficult workover</v-card-subtitle>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Well Name
                </th>
                <th class="text-left">
                  COF
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in wellsWithDifficult"
                :key="item.wellName"
              >
                <td>{{ item.wellName }}</td>
                <td>{{ item.COF }}</td>
              </tr>
            </tbody>
          </v-table>

        </div>
      </div>
      <v-card-title>Analysis Results</v-card-title>
      <!-- second table -->
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Well
            </th>
            <th class="text-left">
              % of undamaged k
            </th>
            <th class="text-left">
              % of undamaged S
            </th>
            <th class="text-left">
              Production gain, stb/day
            </th>
            <th class="text-left">
              Flow efficiency B/S
            </th>
            <th class="text-left">
              Flow efficiency A/S
            </th>
            <th class="text-left">
              R-factor B/S
            </th>
            <th class="text-left">
              R-factor A/S
            </th>
            <th class="text-left">
              Cumulative Production, bbl
            </th>
            <th class="text-left">
              Time of Abandonment, months
            </th>
            <th class="text-left">
              Time of Abandonment, years
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in inputStore.technicalAnalysisResults"
            :key="item.wellName"
          >
            <td>{{ item.wellName }}</td>
            <td>{{ item.undamagedKPercent }} %</td>
            <td>{{ item.undamagedSPercent }} %</td>
            <td>{{ item.productionGain }}</td>
            <td>{{ item.flowEffeciencyBS }}</td>
            <td>{{ item.flowEffeciencyAS }}</td>
            <td>{{ item.RfactorBS }}</td>
            <td>{{ item.RfactorAS }}</td>
            <td>{{ item.cumulativeProduction }}</td>
            <td>{{ item.abondonmentTimeMonths }}</td>
            <td>{{ item.abondonmentTimeYears }}</td>
          </tr>
        </tbody>
      </v-table>
      <div class="actions">
        <v-btn
          prepend-icon="mdi-arrow-left"
          color="purple-lighten-1"
          @click="router.push('/complexity-factor-calculation')"
        >
          Back
        </v-btn>
        <v-btn
          append-icon="mdi-arrow-right"
          color="purple-lighten-1"
          @click="router.push('/technical-analysis-results/graphs')"
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useInputStore } from '~/stores/InputStore'

const router = useRouter()
const inputStore = useInputStore()


const wellsWithEasy = computed(() => (
  inputStore.wells
    .filter(well => well.COFResults.COF < 50)
    .map(well => ({ COF: well.COFResults.COF, wellName: well.wellName }))
))

const wellsWithDifficult = computed(() => (
  inputStore.wells
    .filter(well => well.COFResults.COF >= 50)
    .map(well => ({ COF: well.COFResults.COF, wellName: well.wellName }))
))

onMounted(() => {
  inputStore.calculateTechnicalAnalysisResults()
})


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