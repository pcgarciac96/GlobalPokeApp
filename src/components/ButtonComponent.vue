<template>
  <button
    :class="buttonClass"
    @click="handleClick"
    class="px-4 py-2 rounded-3xl focus:outline-none transition duration-300 font-lato"
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
      default: "bg-blue-500",
    },
  },
  setup(props, { emit }) {
    const buttonClass = computed(() => {
      return `${props.color} text-white hover:${props.color.replace(
        "500",
        "700"
      )} focus:ring-2 focus:ring-offset-2 focus:ring-${
        props.color.split("-")[1]
      }`;
    });

    const handleClick = () => {
      emit("click");
    };

    return {
      text: props.text,
      buttonClass,
      handleClick,
    };
  },
});
</script>