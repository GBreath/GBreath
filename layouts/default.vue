<template>
  <main
    class="flex flex-col items-center jusitfy-center self-center m-auto"
    style="width: min(630px, 100%)"
  >
    <slot />
    <loading />
  </main>
</template>

<style lang="scss">
.page-content {
  @apply w-full flex flex-col items-start justify-start gap-4 p-4 relative z-10;
  > h2,
  .page-title {
    @apply text-2xl font-bold;
  }
  > h3,
  .page-subtitle {
    @apply text-xl font-bold;
  }
}
</style>
