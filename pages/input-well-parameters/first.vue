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
      <v-app-bar-title>Input Well Parameters</v-app-bar-title>
    </v-app-bar>
    <main class="body">
      <div class="row">
        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Name of the well"
          v-model="inputStore.wellName"
        ></v-text-field>
        <v-select
          variant="solo"
          class="input"
          :items="['Horizontal', 'Vertical']"
          label="Well type"
          v-model="inputStore.wellType"
        ></v-select>
        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Pr - Pwf"
          type="number"
          suffix="psi"
          v-model="inputStore.pressure"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Viscosity"
          type="number"
          suffix="cP"
          v-model="inputStore.viscosity"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Wellbore radius"
          type="number"
          suffix="ft"
          v-model="inputStore.wellboreRadius"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Reservoir thickness"
          type="number"
          suffix="ft"
          v-model="inputStore.reservoirThickness"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="FVF"
          type="number"
          suffix="rb/stb"
          v-model="inputStore.fvf"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Skin factor"
          v-model="inputStore.skinFactor"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Permeability"
          type="number"
          suffix="md"
          v-model="inputStore.permeability"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Reservoir radius"
          type="number"
          suffix="ft"
          v-model="inputStore.reservoirRadius"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Damaged k"
          type="number"
          suffix="md"
          v-model="inputStore.damagedK"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Q"
          type="number"
          suffix="stb/day"
          v-model="inputStore.q"
        ></v-text-field>
      </div>
      <div class="actions">
        <v-btn
          prepend-icon="mdi-arrow-left"
          color="purple-lighten-1"
          @click="router.push('/')"
        >
          Back
        </v-btn>
        <v-btn
          append-icon="mdi-arrow-right"
          color="purple-lighten-1"
          @click="router.push('/input-well-parameters/after-stimulation')"
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