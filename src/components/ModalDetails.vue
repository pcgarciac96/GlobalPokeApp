<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="relative bg-white rounded-lg w-96 shadow-lg border"
      @click="closeModal"
    >
      <div class="absolute w-5 h-5 top-2 right-5 cursor-pointer">
        <closeIcon />
      </div>

      <div
        class="flex justify-center mb-4 rounded-t-md"
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
      <div class="px-4">
        <p class="my-2 font-lato text-sm text-[#5E5E5E] capitalize">
          <strong class="text-md">Name:</strong> {{ pokemon?.name }}
        </p>
        <hr />
        <p class="my-2 font-lato text-sm text-[#5E5E5E]">
          <strong>Weight:</strong> {{ pokemon?.weight }}
        </p>
        <hr />
        <p class="my-2 font-lato text-sm text-[#5E5E5E]">
          <strong>Height:</strong> {{ pokemon?.height }}
        </p>
        <hr />

        <div class="flex flex-row mb-2 my-2 font-lato text-sm text-[#5E5E5E]">
          <strong class="mr-2 font-lato">Types:</strong>
          <p>
            <span
              class="capitalize"
              v-for="(type, index) in pokemon?.types"
              :key="type.type.name"
            >
              {{ type.type.name
              }}<span v-if="index < pokemon?.types.length - 1">, </span>
            </span>
          </p>
        </div>
        <hr />
        <div class="my-5">
          <ButtonComponent
            text="Share to my friends"
            color="#F22539"
            @click="sharedToFriends"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { getPokemonbyName } from "../services/api";
import closeIcon from "../assets/icons/closeIcon.vue";
import backgroundImagePath from "../assets/images/backgroundImage.png";
import ButtonComponent from "./ButtonComponent.vue";

export default {
  name: "PokemonModal",
  components: {
    closeIcon,
    ButtonComponent,
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

    const sharedToFriends = () => {
      if (pokemon.value) {
        const textToShared = [
          `Name: ${pokemon.value.name}`,
          `Weight: ${pokemon.value.weight}`,
          `Height: ${pokemon.value.height}`,
          `Types: ${pokemon.value.types
            .map((type: any) => type.type.name)
            .join(", ")}`,
        ].join(", ");

        navigator.clipboard
          .writeText(textToShared)
          .then(() => {
            alert("Copied to clipboard: " + textToShared);
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
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
      sharedToFriends,
    };
  },
};
</script>
