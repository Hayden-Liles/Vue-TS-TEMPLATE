
<template>
  <header>
    <!-- HEADER IF NEEDED -->
  </header>

  <main>
    <router-view/>
  </main>

  <footer>
    <!-- FOOTER IF NEEDED -->
  </footer>

</template>

<script lang="ts">
import { computed } from 'vue';
import { AppState } from './AppState';

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
