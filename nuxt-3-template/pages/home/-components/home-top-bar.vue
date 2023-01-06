<template>
  <nav
    class="flex flex-row items-center justify-between w-full"
    style="user-select: none"
  >
    <nuxt-link to="/settings">
      <iconify-icon width="28" icon="mdi:cog"></iconify-icon>
    </nuxt-link>
    <nuxt-link to="/">
      <h1 class="page-title logo text">GBreath</h1>
    </nuxt-link>
    <client-only>
      <div>
        <iconify-icon
          v-if="$colorMode.value === 'dark'"
          width="28"
          icon="ph:sun-fill"
          @click="$colorMode.preference = 'light'"
        ></iconify-icon>
        <iconify-icon
          v-if="$colorMode.value === 'light'"
          width="28"
          icon="ph:moon-fill"
          @click="$colorMode.preference = 'dark'"
        ></iconify-icon>
      </div>
    </client-only>
  </nav>
</template>
