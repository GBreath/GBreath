<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="gap-2 flex flex-row items-center justify-between w-full h-full">
      <div
        class="flex flex-col items-center justify-center w-full h-24 card bg-base-200 rounded-box"
      >
        <h4 class="text-xl font-bold">
          0 <span class="text-lg">{{ $t("home.streak.day") }}</span>
        </h4>
        <small class="uppercase text-xs font-light">
          {{ $t("home.streak.YOURGOAL") }}
        </small>
      </div>
      <div class="w-[1px] h-16 bg-base-200"></div>
      <div
        class="flex flex-col items-center justify-center h-24 w-full card bg-base-200 rounded-box"
      >
        <h4 class="text-xl font-bold">
          0 <span class="text-lg">{{ $t("home.streak.day") }}</span>
        </h4>
        <small class="uppercase text-xs font-light">
          {{ $t("home.streak.YOURSTREAK") }}
        </small>
      </div>
    </div>
    <span
      class="whitespace-nowrap w-full mt-4 flex flex-row items-center justify-start gap-2"
    >
      <span class="text-xs font-medium">10% / 100%</span>
      <progress
        class="progress progress-info w-full"
        value="40"
        max="100"
      ></progress>
    </span>
  </div>
</template>
