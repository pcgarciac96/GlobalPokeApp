<template>
    <div class="flex justify-center items-center pt-20 w-full bg-gray 500 sm:px-10 md:px-0">
      <div class="flex flex-col items-center w-96 h-auto overflow-y-auto">
        <div
          v-for="pokemon in pokemons"
          :key="pokemon.name"
          class="flex flex-row items-center w-full mb-5  bg-white h-14 rounded-md pl-4 pr-2"
        >
          <p class="w-1/2  flex justify-star items-center text-lg font-lato capitalize ">
            {{ pokemon.name }}
          </p>
          <div class="w-1/2 flex justify-end items-center">
            <div @click="checkAsFavorite(pokemon)" class="cursor-pointer ">
                <div class="flex justify-center items-center w-11 h-11 bg-[#F5F5F5] rounded-full">
                    <favIcon />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { Pokemon } from "../interfaces/Pokemons";
  import favIcon from "../assets/icons/favIcon.vue";
  
  export default defineComponent({
    name: "ListAllPokemons",
    components: {
      favIcon,
    },
    props: {
      pokemons: {
        type: Array as PropType<Pokemon[]>,
        required: true,
      },
    },
    setup() {
      const checkAsFavorite = (pokemon: Pokemon) => {
        console.log("Pokémon añadido a favorito:", pokemon);
      };
  
      return { checkAsFavorite };
    },
  });
  </script>
  