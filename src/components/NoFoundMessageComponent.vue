<template>
  <div
    class="flex flex-col justify-center items-center  w-full h-full"
  >
    <h1 class="text-3xl font-bold font-lato">{{ title }}</h1>
    <p class="text-center my-5 text-gray-500 justify-center w-10/12 font-lato">
      {{ message }}
    </p>
    <ButtonComponent
      text="Go back home"
      color="#F22539"
      @click="redirectToListPokemon"
    />
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import router from "../router";

export default {
  name: "NoFoundMessageComponent",
  components: {
    ButtonComponent,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const redirectToListPokemon = () => {
      router.push("/");
    };

    return { redirectToListPokemon };
  },
};
</script>
