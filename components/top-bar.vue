<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "GBreath",
  },
});
</script>

<template>
  <nav
    class="flex flex-row items-center justify-between w-full"
    style="user-select: none"
  >
    <h2 class="page-title">{{ title }}</h2>

    <button @click="$router.back()">
      <iconify-icon
        width="28"
        icon="material-symbols:chevron-left-rounded"
      ></iconify-icon>
    </button>
  </nav>
</template>
