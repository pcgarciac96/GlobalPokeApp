<template>
  <button
    :style="{ width: buttonWidth, backgroundColor: buttonColor }"
    @click="handleClick"
    class="px-4 py-2 rounded-3xl focus:outline-none transition duration-300 font-lato text-white hover:opacity-90 focus:ring-2 focus:ring-offset-2"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#3b82f6",
    },
    width: {
      type: String,
      default: "auto",
    },
  },
  setup(props, { emit }) {
    const buttonWidth = props.width;
    const buttonColor = props.color;

    const handleClick = () => {
      emit("click");
    };

    return {
      text: props.text,
      buttonWidth,
      buttonColor,
      handleClick,
    };
  },
});
</script>
