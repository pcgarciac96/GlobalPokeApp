import { Module } from "vuex";
import { Pokemon } from "../../interfaces/Pokemons";

interface FavoritesState {
  favorites: Pokemon[];
}

const favoritesModule: Module<FavoritesState, any> = {
  namespaced: true,
  state: {
    favorites: [],
  },
  mutations: {
    ADD_FAVORITE(state, pokemon: Pokemon) {
      if (!state.favorites.some((fav) => fav.name === pokemon.name)) {
        state.favorites.push(pokemon);
      }
    },
    REMOVE_FAVORITE(state, pokemonName: string) {
      state.favorites = state.favorites.filter(
        (fav) => fav.name !== pokemonName
      );
    },
  },
  actions: {
    addFavorite({ commit }, pokemon: Pokemon) {
     console.log("pokemon", pokemon);
      commit("ADD_FAVORITE", pokemon);
    },
    removeFavorite({ commit }, pokemonName: string) {
      commit("REMOVE_FAVORITE", pokemonName);
    },
  },
  getters: {
    getFavorites(state): Pokemon[] {
      return state.favorites;
    },
    isFavorite: (state) => (pokemonName: string): boolean => {
      return state.favorites.some((fav) => fav.name === pokemonName);
    },
  },
};

export default favoritesModule;
