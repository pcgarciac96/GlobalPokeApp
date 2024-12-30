<template>
  <div class="flex flex-col">
    <div
      class="flex flex-col justify-center items-center pt-20 w-full h-full sm:px-10 md:px-0"
    >
      <SearchBar :onSearch="searchPokemon" />
      
      <div class="flex flex-col items-center w-96 h-96 overflow-y-auto">
        <div
          v-for="pokemon in filteredPokemons"
          :key="pokemon.name"
          class="flex flex-row items-center w-full mb-5 bg-white h-14 rounded-md pl-4 pr-2"
        >
          <p
            class="w-1/2 flex justify-start items-center text-lg font-lato capitalize"
          >
            {{ pokemon.name }}
          </p>

          <div class="w-1/2 flex justify-end items-center">
            <div @click="toggleFavorite(pokemon)" class="cursor-pointer">
              <div
                class="flex justify-center items-center w-11 h-11 bg-[#F5F5F5] rounded-full"
              >
                <favIcon
                  :color="isFavorite(pokemon.name) ? '#ECA539' : '#BFBFBF'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-red-00 w-full h-full">
      <div class="flex justify-center items-center w-full h-full gap-10">
        <ButtonComponent
          text="All"
          color="#F22539"
          @click="showFavorites = false"
        />
        <ButtonComponent
          text="Favorites"
          color="#BFBFBF"
          @click="showFavorites = true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { useStore } from "vuex";
import { Pokemon } from "../interfaces/Pokemons";
import favIcon from "../assets/icons/favIcon.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import SearchBar from "../components/SearchBar.vue";

export default defineComponent({
  name: "ListAllPokemons",
  components: {
    favIcon,
    ButtonComponent,
    SearchBar,
  },
  props: {
    pokemons: {
      type: Array as PropType<Pokemon[]>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const showFavorites = ref(false);
    
    const filteredPokemons = computed(() => {
      return showFavorites.value
        ? props.pokemons.filter(pokemon => isFavorite(pokemon.name))
        : props.pokemons;
    });

    const searchPokemon = async (name: string) => {
      console.log("Buscando Pokémon:", name);
     
    };

    

    const isFavorite = (pokemonName: string) => {
      return store.getters["favorites/isFavorite"](pokemonName);
    };

    const toggleFavorite = (pokemon: Pokemon) => {
      if (isFavorite(pokemon.name)) {
        store.dispatch("favorites/removeFavorite", pokemon.name);
      } else {
        store.dispatch("favorites/addFavorite", pokemon);
      }
    };

    return { showFavorites, filteredPokemons, toggleFavorite, isFavorite, searchPokemon };
  },
});
</script>