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
      <v-app-bar-title>Treatment Design</v-app-bar-title>
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
        @click="() => {
        inputStore.calculateHclResults()
        isCalClicked = true
      }"
        color="teal-accent-4"
        style="width: 350px; margin: 10px;"
        prepend-icon="mdi-arrow-right"
      >
        Results
      </v-btn>
      <div v-if="isCalClicked">
        <h1>Treatment Design</h1>

        <h3>1. Tubing Pickling/Wellbore Cleanup</h3>
        <p>7.5% HCl + iron control agent + corrosion inhibitor</p>

        <h3>2. Preflush</h3>

        <h4>2.1. Non-acid</h4>
        <p> {{ nonAcidConcentration }}% NH4Cl 40-80 gal/ft. </p>

        <h4>2.2. Acid</h4>
        <p>{{ inputStore.hclResults.preflush }} 50-100 gal/ft.</p>

        <h3>3. Main Flush</h3>
        <p>{{ inputStore.hclResults.mainTreatment }} 10-250 gal/ft.</p>

        <h3>4. Overflush</h3>
        <p>{{ inputStore.hclResults.preflush }} 25-100 gal/ft.</p>

        <h3>Recommendations</h3>
        <p>1. If iron and carbonate contents are high, add ammonium chloride for clay stability to Acid Preflush fluid.
        </p>
        <p>2. The well shut-in time after treatment should be minimized to reduce precipitation of reaction product.</p>

        <p>3. Wells with low bottom hole static pressure (BHSP) should be treated with energized/foamed fluids.</p>

        <p>4. Sludge or emulsion tendency of crude will dictate the use of a specific acid system.</p>

        <p>5.The afterflush should occur immediately after the main acid injection to minimize precipitation of Si
          (OH)4.
        </p>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInputStore } from '~/stores/InputStore'


const router = useRouter()
const inputStore = useInputStore()

const isCalClicked = ref(false)
const nonAcidConcentration = computed(() => 3 + (parseFloat(inputStore.smectite) * 0.3 + parseFloat(inputStore.illite) * 0.12 + parseFloat(inputStore.kaolinite) * 0.08 + parseFloat(inputStore.chlorite) * 0.12 + parseFloat(inputStore.feldspars) * 0.05))


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