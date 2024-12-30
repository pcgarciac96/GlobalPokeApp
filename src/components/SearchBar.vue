<template>
    <div class="flex items-center w-80 mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Pokémon..."
        class="p-2 border rounded-l-md w-full"
        @input="searchPokemon"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from "vue";
  
  export default {
    name: "SearchBar",
    props: {
      onSearch: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const searchQuery = ref("");
  
      const searchPokemon = () => {
        props.onSearch(searchQuery.value);  // Emitir siempre el valor
      };
  
      return { searchQuery, searchPokemon };
    },
  };
  </script>
  