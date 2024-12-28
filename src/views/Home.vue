<template>
  <div class="flex justify-center items-center">
    <div
      class="w-52 h-52 bg-[#F22539] rounded-full flex justify-center items-center mt-28 border-2 border-black"
    >
      <div class="absolute z-10 top-11 ml-5">
        <pikachu />
      </div>
    </div>
  </div>

  <div class="flex justify-center items-center mt-10">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold">Welcome to Pokédex</h1>
      <p class="text-center my-10 text-gray-500 justify-center w-10/12 font-lato">
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
      <ButtonComponent
        text="Get started"
        color="bg-[#F22539]"
        @click="redirectToListPokemon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import pikachu from "../assets/images/pikachu.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    pikachu,
    ButtonComponent,
  },
  setup() {
    const router = useRouter();

    const redirectToListPokemon = () => {
      router.push('/ListPokemon');
    };
    return { redirectToListPokemon };
  },
});
</script>
