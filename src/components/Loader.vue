<template>
    <div class="flex justify-center items-center animate-pulse w-full h-full">
        <PokeLoader />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import PokeLoader from "../assets/images/PokeLoader.vue";

export default defineComponent({
  name: "loader",
  components: {
    PokeLoader,
  },
 
  setup(props) {
  
  },
});
</script>

<style scoped></style>