<template>
  <div class="bg-red-00 w-full h-full">
    <div class="flex justify-center items-center w-full h-full gap-10">
        <ButtonComponent
        text="All"
        color="#F22539"
        @click="redirectToListPokemon"
      />
      <ButtonComponent
        text="Favorites"
        color="#BFBFBF"
        @click="redirectToListPokemon"
      />
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ButtonComponent from "./ButtonComponent.vue";

export default defineComponent({
    name: "GroupButtonComponent",
    components: {
        ButtonComponent,
    },
  setup() {
    return {};
  },
});
</script>