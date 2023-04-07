
<template>
  <header>
    <Navbar/>
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
import Navbar from './components/Navbar.vue';

export default {
    setup() {
        return {
            appState: computed(() => AppState),
        };
    },
    components: { Navbar }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
