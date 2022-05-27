<template>
    <div class="box has-text-weight-bold estilos" >
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Box',
    });

</script>

<style scoped>
    .estilos {
        background-color: #FAF0CA;
    }
</style>
