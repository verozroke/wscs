<template>
  <v-parallax
    src="https://images.unsplash.com/photo-1624771002998-4aadfd43e7c4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    class="home"
  >
    <div class="home-overlay">
      <h1 class="home-title">Well Stimulation <br> Candidate Selection</h1>
      <NuxtLink to="/input-well-parameters/first">
        <v-btn
          class="home-button"
          size="large"
          style="text-transform: none;"
          append-icon="mdi-arrow-right"
        >
          Proceed to technical and
          economic analysis
        </v-btn>
      </NuxtLink>
    </div>
  </v-parallax>
</template>

<script
  setup
  lang="ts"
>

</script>

<style
  lang="scss"
  scoped
>
.home {
  width: 100vw;
  height: 100vh;
  position: relative;

  &-overlay {
    position: absolute;
    background-color: #00000079;
    inset: 0;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-title {
    font-size: 64px;
    color: #fff;
    font-weight: 700;
  }
}
</style>