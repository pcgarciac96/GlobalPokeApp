<template>
    <div @click="toggle" class="cursor-pointer">
      <div
        class="flex justify-center items-center w-11 h-11 bg-[#F5F5F5] rounded-full"
      >
        <favIcon :color="isFavorite ? '#ECA539' : '#BFBFBF'" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import favIcon from "../assets/icons/favIcon.vue";
  
  export default defineComponent({
    name: "FavoriteButton",
    components: { favIcon },
    props: {
      isFavorite: {
        type: Boolean,
        required: true,
      },
      toggleFavorite: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const toggle = () => {
        props.toggleFavorite();
      };
  
      return {
        toggle,
      };
    },
  });
  </script>