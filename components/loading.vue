<script lang="ts" setup>
import { useLoading } from "~~/store/loading";
const loading = useLoading();
</script>

<template>
  <section class="overlay" :class="loading.isOpen ? 'opened' : 'closed'">
    <div class="content-overlay" :class="loading.isOpen ? 'opened' : 'closed'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="shape-rendering: auto"
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#ffffff"
          stroke-width="10"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
      <h2 v-if="loading.hint" class="text-2xl text-white">
        {{ loading.hint }}
      </h2>
    </div>
  </section>
</template>

<style scoped>
.overlay {
  @apply w-screen h-screen fixed top-0 left-0 z-50 flex flex-col items-center justify-center transition-all duration-500;
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: none;
}
.overlay.opened {
  @apply z-50 opacity-100;
  pointer-events: visible;
}
.overlay.closed {
  @apply z-50 opacity-0;
  pointer-events: none;
}
.content-overlay {
  @apply h-full w-full flex flex-col items-center justify-center gap-8 transition-all duration-300;
}
.content-overlay.opened {
  @apply scale-100;
}
.content-overlay.closed {
  @apply scale-0;
}
</style>
