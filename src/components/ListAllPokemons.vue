<template>
  <div class="flex justify-center items-center flex-col px-4">
    <div class="py-10">
      <SearchBar :onSearch="searchPokemon" />

      <div v-if="filteredPokemons.length >= 1">
        <div class="flex flex-col items-center w-96 sm:h-1/2 md:h-96 overflow-y-auto">
          <div
            v-for="pokemon in filteredPokemons"
            :key="pokemon.name"
            class="flex flex-row items-center w-full mb-5 bg-white h-14 rounded-md pl-4 pr-2 py-2"
          >
            <p
              @click="openPokemonModal(pokemon.name)"
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
      <div
        v-else
        class="flex flex-col justify-center items-center w-96 h-96 sm:px-10 md:px-0"
      >
        <NoFoundMessageComponent
          title="Uh-oh!"
          message="You look lost on your journey!"
        />
      </div>
    </div>
    <PokemonModal
      :isOpen="isModalOpen"
      :pokemonName="selectedPokemon"
      @update:isOpen="isModalOpen = $event"
    />
    {{ showFavorites }}
      <div class="w-full h-full bg-white py-4 shadow-custom">
        <div class="flex justify-center items-center w-full h-full gap-10">
          <ButtonComponent
            text="All"
            :color="!showFavorites ? '#F22539' : '#BFBFBF'"
            width="145px"
            @click="showFavorites = false"
          />
          <ButtonComponent
            text="Favorites"
            :color="showFavorites ? '#F22539' : '#BFBFBF'"
            width="145px"
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
import NoFoundMessageComponent from "../components/NoFoundMessageComponent.vue";
import PokemonModal from "../components/ModalDetails.vue";
import { getPokemonbyName } from "../services/api";

export default defineComponent({
  name: "ListAllPokemons",
  components: {
    favIcon,
    ButtonComponent,
    SearchBar,
    NoFoundMessageComponent,
    PokemonModal,
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
    const searchQuery = ref("");
    const isModalOpen = ref(false);
    const selectedPokemon = ref("");

    const filteredPokemons = computed(() => {
      let pokemonsToSearch = showFavorites.value
        ? props.pokemons.filter((pokemon) => isFavorite(pokemon.name))
        : props.pokemons;

      if (searchQuery.value.trim()) {
        pokemonsToSearch = pokemonsToSearch.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return pokemonsToSearch;
    });

    const searchPokemon = (name: string) => {
      searchQuery.value = name;
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

    const openPokemonModal = (pokemonName: string) => {
      selectedPokemon.value = pokemonName;
      isModalOpen.value = true;
    };

    return {
      showFavorites,
      filteredPokemons,
      toggleFavorite,
      isFavorite,
      searchPokemon,
      isModalOpen,
      selectedPokemon,
      openPokemonModal,
    };
  },
});
</script>
<style scoped>
.shadow-custom {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
