<template>
  <button
    :style="{ width: buttonWidth, backgroundColor: buttonColor }"
    @click="handleClick"
    class="px-4 py-2 rounded-3xl font-lato text-white flex items-center justify-center gap-2"
  >
    <slot name="icon"></slot> <!-- Slot para el ícono -->
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";

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
    const buttonColor = computed(() => props.color);

    const buttonWidth = props.width;

    const handleClick = () => {
      emit("click");
    };

    watch(
      () => props.color,
      (newColor, oldColor) => {
        console.log(`Button color changed from ${oldColor} to ${newColor}`);
      }
    );

    return {
      text: props.text,
      buttonWidth,
      buttonColor,
      handleClick,
    };
  },
});
</script>
