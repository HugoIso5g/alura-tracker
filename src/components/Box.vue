<template>
    <div class="box has-text-weight-bold" :styles="estilos">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Box',
        data() {
            return{
                estilos:{
                     backgroundColor: '#FAF0CA',
                }
            }
        }
    });

</script>
