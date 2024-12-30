<template>
    <div class="animate-pulse">
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