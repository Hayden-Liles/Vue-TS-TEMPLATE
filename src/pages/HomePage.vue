<template>
</template>


<script lang="ts">
import { onMounted } from 'vue';
import Pop from '../utils/Pop'


export default {
    setup() {
        onMounted(() => {
            Pop.confirm("hi")
        })
        return {};
    },
}
</script>


<style lang="scss" scoped>

</style>