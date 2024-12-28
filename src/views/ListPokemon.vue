<template>
  <div class="flex justify-center items-center bg-[#F9F9F9]">
    <ListAllPokemons :pokemons="pokemonList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getPokemonList } from "../services/api";
import { Pokemon } from "../interfaces/Pokemons";
import ListAllPokemons from "../components/ListAllPokemons.vue";

export default defineComponent({
  components: {
    ListAllPokemons,
  },
  setup() {
    const pokemonList = ref<Pokemon[]>([]);

    const handleButtonClick = () => {
      console.log("Button clicked");
    };

    onMounted(async () => {
      const response = await getPokemonList(30, 0);
      pokemonList.value = response.data.results;
      console.log(pokemonList.value);
    });
    return { handleButtonClick, pokemonList };
  },
});
</script>
