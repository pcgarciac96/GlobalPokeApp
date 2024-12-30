<template>
    <div class="flex items-center w-full mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Pokémon..."
        class="p-2 border rounded-md w-full font-lato focus:outline-none"
        :class="isFocused ? 'border-none' : 'border'"
        @input="searchPokemon"
        @focus="isFocused = true"
        @blur="isFocused = false"
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
  