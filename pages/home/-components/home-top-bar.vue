<script lang="ts" setup>
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();

const i18n = useI18n();

const handleSignOut = async () => {
  const res = await Swal.fire({
    title: i18n.t("alerts.do_you_really_want_signout"),
    icon: "question",
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: i18n.t("buttons.cancel"),
    confirmButtonText: i18n.t("buttons.yes_sign_out"),
  });

  if (res.isConfirmed) {
    await authStore.signOut();
  }
};
</script>

<template>
  <nav
    class="flex flex-row items-center justify-between w-full"
    style="user-select: none"
  >
    <nuxt-link to="/settings">
      <iconify-icon width="28" icon="mdi:cog"></iconify-icon>
    </nuxt-link>
    <nuxt-link to="/">
      <h1 class="page-title logo !text-3xl">GBreath</h1>
    </nuxt-link>
    <div
      v-if="authStore.token"
      class="flex flex-row items-center justify-center gap-2"
    >
      <button class="text-error" @click="handleSignOut">
        <iconify-icon width="28" icon="ph:sign-out-bold"></iconify-icon>
      </button>
      <nuxt-link to="/profile">
        <iconify-icon width="28" icon="mdi:user-circle"></iconify-icon>
      </nuxt-link>
    </div>
    <nuxt-link v-else to="/auth/sign-in">
      <iconify-icon width="28" icon="ph:sign-in-bold"></iconify-icon>
    </nuxt-link>
  </nav>
</template>
