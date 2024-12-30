<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="relative bg-red-600 rounded-lg w-96 shadow-lg border"
      @click="closeModal"
    >
      <div class="absolute w-5 h-5 top-2 right-2 cursor-pointer">
        <closeIcon />
      </div>

      <div
        class="flex justify-center mb-4 bg-red-50"
        :style="{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: '55%',
          backgroundPosition: 'center',
        }"
      >
        <img
          :src="pokemon?.sprites?.other?.['official-artwork']?.front_default"
          alt="Pokemon Image"
          class="w-32 h-32 object-contain"
        />
      </div>
      <div>
        <p><strong>Name:</strong> {{ pokemon?.weight }}</p>
        <p><strong>Weight:</strong> {{ pokemon?.weight }}</p>
        <p><strong>Height:</strong> {{ pokemon?.height }}</p>

        <div class="flex flex-row mb-2">
          <strong class="mr-2">Types:</strong>
          <p>
            <span v-for="(type, index) in pokemon?.types" :key="type.type.name">
              {{ type.type.name
              }}<span v-if="index < pokemon?.types.length - 1">, </span>
            </span>
          </p>
        </div>
      </div>

      <div class="flex justify-between mt-4">
        <button
          @click="shareToFriends"
          class="px-4 py-2 bg-red-500 text-white rounded-md flex-1 mr-2"
        >
          Share to my friends
        </button>
        <button
          @click="addToFavorites"
          class="px-4 py-2 bg-yellow-400 text-white rounded-md flex-1"
        >
          ★
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { getPokemonbyName } from "../services/api";
import closeIcon from "../assets/icons/closeIcon.vue";
import backgroundImagePath from "../assets/images/backgroundImage.png";

export default {
  name: "PokemonModal",
  components: {
    closeIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    pokemonName: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const pokemon = ref<any>(null);
    const backgroundImage = ref(backgroundImagePath);

    const fetchPokemonDetails = async () => {
      if (props.pokemonName) {
        try {
          const response = await getPokemonbyName(props.pokemonName);
          pokemon.value = response;
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        }
      }
    };

    watch(
      () => props.pokemonName,
      () => {
        if (props.isOpen) {
          fetchPokemonDetails();
        }
      }
    );

    watch(
      () => props.isOpen,
      (newIsOpen) => {
        if (newIsOpen) {
          fetchPokemonDetails();
        }
      }
    );

    const closeModal = () => {
      emit("update:isOpen", false);
    };

    const shareToFriends = () => {
      alert("Shared to friends!");
    };

    const addToFavorites = () => {
      alert("Added to favorites!");
    };

    return {
      pokemon,
      closeModal,
      shareToFriends,
      addToFavorites,
      backgroundImage,
    };
  },
};
</script>
