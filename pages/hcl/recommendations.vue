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
      <v-app-bar-title>Recipe Recommendations</v-app-bar-title>
    </v-app-bar>
    <main class="body">

      <div>
        <h1>Treatment Design</h1>

        <h2>1. Tubing Pickling/Wellbore Cleanup</h2>
        <p>7.5% HCl + iron control agent + corrosion inhibitor</p>

        <h2>2. Preflush</h2>

        <h3>2.1. Non-acid</h3>
        <p> {{ nonAcidConcentration }}% NH4Cl 40-80 gal/ft. </p>

        <h3>2.2. Acid</h3>
        <p>{{ inputStore.hclResults.preflush }} 50-100 gal/ft.</p>

        <h2>3. Main Flush</h2>
        <p>{{ inputStore.hclResults.mainTreatment }} 10-250 gal/ft.</p>

        <h2>4. Overflush</h2>
        <p>{{ inputStore.hclResults.preflush }} 25-100 gal/ft.</p>

        <h2>Recommendations</h2>

        <h3>1.</h3>
        <p>If iron and carbonate contents are high, add ammonium chloride for clay stability to Acid Preflush fluid.</p>

        <h3>2.</h3>
        <p>The well shut-in time after treatment should be minimized to reduce precipitation of reaction product.</p>

        <h3>3.</h3>
        <p>Wells with low bottom hole static pressure (BHSP) should be treated with energized/foamed fluids.</p>

        <h3>4.</h3>
        <p>Sludge or emulsion tendency of crude will dictate the use of a specific acid system.</p>

        <h3>5.</h3>
        <p>The afterflush should occur immediately after the main acid injection to minimize precipitation of Si (OH)4.
        </p>
      </div>

      <div class="actions">
        <v-btn
          prepend-icon="mdi-arrow-left"
          color="purple-lighten-1"
          @click="router.push('/hcl')"
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