<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="Decline curve type is hyberbolic"
        title="Enter the constant b"
      >

        <div style="padding: 10px 30px">
          <v-text-field
            variant="solo"
            class="input"
            label="Constant b"
            v-model="inputStore.b"
          ></v-text-field>
          <v-btn
            @click="() => {
        inputStore.calculateSecondResultsResults()
        dialog = false
        isCalClicked = true
      }"
            color="green"
            prepend-icon="mdi-calculator"
          >
            Calculate
          </v-btn>
        </div>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
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
      <v-app-bar-title>Input Well Parameters after stimulation</v-app-bar-title>
    </v-app-bar>
    <main class="body">
      <div class="two-param-form">
        <div class="row">

          <v-select
            variant="solo"
            class="input"
            :items="['Exponential', 'Harmonical', 'Hyperbolic']"
            label="Decline curve type"
            v-model="inputStore.declineCurveType"
          ></v-select>
          <v-text-field
            variant="solo"
            class="input"
            label="Decline rate"
            suffix="per day"
            v-model="inputStore.declineRate"
          ></v-text-field>

          <v-text-field
            variant="solo"
            class="input"
            label="Abondonment rate"
            suffix="stb/day"
            v-model="inputStore.abondonmentRate"
          ></v-text-field>

        </div>
        <v-btn
          v-if="!isCalClicked"
          @click="() => {
        if (checkForHyberbolic()) {
          dialog = true
        } else {
          inputStore.calculateSecondResultsResults()
          isCalClicked = true
        }
      }"
          color="green"
          prepend-icon="mdi-calculator"
        >
          Calculate
        </v-btn>
        <v-btn
          @click="router.push('/complexity-factor-calculation')"
          color="teal-accent-4"
          v-if="isCalClicked"
          style="margin-left: 10px"
          prepend-icon="mdi-arrow-right"
        >
          Results
        </v-btn>
      </div>
      <div class="row">

        <v-text-field
          variant="solo"
          class="input"
          label="Abondonment Time"
          suffix="days"
          readonly
          v-model="inputStore.secondResults.abondonmentTime"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Cumulative Production"
          suffix="bbl"
          readonly
          v-model="inputStore.secondResults.cumulativeProduction"
        ></v-text-field>


      </div>
      <div class="actions">
        <v-btn
          prepend-icon="mdi-arrow-left"
          color="purple-lighten-1"
          @click="router.push('/input-well-parameters/after-stimulation')"
        >
          Back
        </v-btn>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInputStore } from '~/stores/InputStore'

const router = useRouter()
const inputStore = useInputStore()

const isCalClicked = ref(false)
const dialog = ref(false)

const checkForHyberbolic = () => inputStore.declineCurveType === 'Hyperbolic'


const addNewWell = () => {
  inputStore.addNewWell()
  router.push('/input-well-parameters/first')
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