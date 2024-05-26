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
      <v-app-bar-title>Recipe</v-app-bar-title>
    </v-app-bar>
    <main class="body">
      <div class="row">
        <v-select
          variant="solo"
          class="input"
          :items="['Yes', 'No']"
          label="HCL sensitive minerals present"
          v-model="inputStore.hclType"
        ></v-select>
        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="k, md"
          type="number"
          suffix="%"
          v-model="inputStore.k_md"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Mica"
          type="number"
          suffix="%"
          v-model="inputStore.mica"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Feldspars"
          type="number"
          suffix="%"
          v-model="inputStore.feldspars"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Kaolinite"
          type="number"
          suffix="%"
          v-model="inputStore.kaolinite"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Mixed Layer"
          type="number"
          suffix="%"
          v-model="inputStore.mixedLayer"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Illite"
          type="number"
          suffix="%"
          v-model="inputStore.illite"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Smectite"
          type="number"
          suffix="%"
          v-model="inputStore.smectite"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Chlorite"
          type="number"
          suffix="%"
          v-model="inputStore.chlorite"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Glauconite"
          type="number"
          suffix="%"
          v-model="inputStore.glauconite"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          clearable
          label="Zeolite"
          type="number"
          suffix="%"
          v-model="inputStore.zeolite"
        ></v-text-field>
      </div>

      <v-btn
        v-if="!isCalClicked"
        @click="() => {
        inputStore.calculateHclResults()
        isCalClicked = true
      }"
        color="green"
        style="width: 350px; margin: 10px;"
        prepend-icon="mdi-calculator"
      >
        Calculate
      </v-btn>
      <v-btn
        @click="router.push('/hcl/recommendations')"
        color="teal-accent-4"
        v-if="isCalClicked"
        style="width: 350px; margin: 10px;"
        prepend-icon="mdi-arrow-right"
      >
        Results
      </v-btn>
      <div class="row">

        <v-text-field
          variant="solo"
          class="input"
          label="Preflush/Overflush fluid"
          readonly
          v-model="inputStore.hclResults.preflush"
        ></v-text-field>

        <v-text-field
          variant="solo"
          class="input"
          label="Main Treatment Fluid"
          readonly
          v-model="inputStore.hclResults.mainTreatment"
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
          @click="router.push('/hcl/recommendations')"
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