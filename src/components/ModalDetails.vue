<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center sm:px-10 md:px-0"
  >
    <div class="relative bg-white rounded-lg w-96 shadow-lg border">
      <div
        class="absolute w-5 h-5 top-2 right-5 cursor-pointer"
        @click="closeModal"
      >
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
        <div class="flex flex-row my-5">
          <div class="flex w-full">
            <ButtonComponent
              text="Share to my friends"
              color="#F22539"
              @click="sharedToFriends"
            />
          </div>
          <div class="flex w-12 justify-end items-end">
            <FavoriteButton
              :isFavorite="isFavorite(pokemon?.name)"
              :toggleFavorite="() => toggleFavorite(pokemon)"
            />
          </div>
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
import FavoriteButton from "./FavoriteButtonComponent.vue";
import { useStore } from "vuex";

export default {
  name: "PokemonModal",
  components: {
    closeIcon,
    ButtonComponent,
    FavoriteButton,
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
    const store = useStore();
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

    const isFavorite = (pokemonName: string | undefined) => {
      return pokemonName
        ? store.getters["favorites/isFavorite"](pokemonName)
        : false;
    };

    const toggleFavorite = (pokemon: any) => {
      if (isFavorite(pokemon?.name)) {
        store.dispatch("favorites/removeFavorite", pokemon?.name);
      } else {
        store.dispatch("favorites/addFavorite", pokemon);
      }
    };

    return {
      pokemon,
      closeModal,
      backgroundImage,
      sharedToFriends,
      isFavorite,
      toggleFavorite,
    };
  },
};
</script>
