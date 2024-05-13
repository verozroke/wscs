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
      <v-app-bar-title>Input Well Parameters after stimulation</v-app-bar-title>
    </v-app-bar>
    <main class="body">
      <div class="two-param-form">
        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Skin factor A/S"
          v-model="inputStore.skinFactorAS"
        ></v-text-field>
        <v-text-field
          variant="solo"
          class="input"
          type="number"
          clearable
          label="Permeability A/S"
          suffix="md"
          v-model="inputStore.permeabilityAS"
        ></v-text-field>
        <v-btn
          @click="() => {
        inputStore.calculateResultsAfterSimulation()
        isCalClicked = true
      }"
          v-if="!isCalClicked"
          color="green"
          prepend-icon="mdi-calculator"
        >
          Calculate
        </v-btn>
        <v-btn
          v-if="isCalClicked"
          @click="router.push('/input-well-parameters/second')"
          style="margin-left: 10px"
          color="teal-accent-4"
          prepend-icon="mdi-arrow-right"
        >
          Results
        </v-btn>
      </div>
      <div class="row">

        <v-text-field
          variant="solo"
          class="input"
          label="Q A/S"
          suffix="stb/day"
          readonly
          v-model="inputStore.results.qAS"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Q B/S"
          suffix="stb/day"
          readonly
          v-model="inputStore.results.qBS"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="PI Ideal"
          suffix="stb/say/psi"
          readonly
          v-model="inputStore.results.piIdeal"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="PI B/S"
          suffix="stb/day/psi"
          readonly
          v-model="inputStore.results.piBS"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="PI A/S"
          suffix="stb/day/psi"
          readonly
          v-model="inputStore.results.piAS"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="dP skin B/S"
          suffix="psi"
          readonly
          v-model="inputStore.results.dPSkinBS"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Flow Efficiency B/S"
          readonly
          v-model="inputStore.results.flowEfficiencyBS"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="dP skin A/S"
          suffix="psi"
          readonly
          v-model="inputStore.results.dPSkinAS"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Flow Efficiency A/S"
          readonly
          v-model="inputStore.results.flowEfficiencyAS"
        ></v-text-field>
      </div>
      <div class="actions">
        <v-btn
          prepend-icon="mdi-arrow-left"
          color="purple-lighten-1"
          @click="router.push('/input-well-parameters/first')"
        >
          Back
        </v-btn>
        <v-btn
          append-icon="mdi-arrow-right"
          color="purple-lighten-1"
          @click="router.push('/input-well-parameters/second')"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInputStore } from '~/stores/InputStore'

const router = useRouter()
const inputStore = useInputStore()

const isCalClicked = ref(false)

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