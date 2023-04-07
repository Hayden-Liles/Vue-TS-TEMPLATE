<template>
</template>


<script lang="ts">
import { onMounted } from 'vue';
import { logger } from '../utils/Logger';


export default {
    setup() {
        onMounted(() => {
            logger.log('ho')
        })
        return {};
    },
}
</script>


<style lang="scss" scoped>

</style>