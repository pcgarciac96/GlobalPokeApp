<template>
  <div class=" justify-center items-center bg-[#F9F9F9] h-screen">
    <ListAllPokemons v-if="pokemonList.length > 0" :pokemons="pokemonList" />
    <!-- <Loader v-else/> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getPokemonList } from "../services/api";
import { Pokemon } from "../interfaces/Pokemons";
import ListAllPokemons from "../components/ListAllPokemons.vue";
import Loader from "../components/Loader.vue";

export default defineComponent({
  components: {
    ListAllPokemons,
    Loader,
  },
  setup() {
    const pokemonList = ref<Pokemon[]>([]);

    const handleButtonClick = () => {
      console.log("Button clicked");
    };

    onMounted(async () => {
      const response = await getPokemonList(30, 0);
      // setTimeout(() => {
        pokemonList.value = response.data.results;
      // }, 3000); // Tiempo de espera para mostrar el Loader ya que debe ser visible hasta que se cargue la lista de Pokémon


      console.log(pokemonList.value);
    });
    return { handleButtonClick, pokemonList };
  },
});
</script>
