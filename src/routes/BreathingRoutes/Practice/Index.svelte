<style lang="scss" scoped>
.breathing-practice-page {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .breathing-practice {
    width: min(480px, 100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.completed {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  .svg-container {
    svg {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
button {
  margin-top: 16px;
}
h3 {
  font-weight: 400;
  strong {
    font-weight: bold;
  }
  &.medium {
    font-weight: 500;
  }
}
.outside {
  background: #7dcaf3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 8px solid #ddd;
}
.inside {
  background: #54b6eb;
  border: 0;
  border-radius: 50%;
  padding: 16px;
  font-size: large;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 240px;
  height: 240px;
  transform: scale(0.5);
  &.inhale {
    animation: inhale;
  }
  &.hold {
    animation: hold;
  }
  &.exhale {
    animation: exhale;
  }
}
.return-button {
  width: 100%;
  min-height: 45px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  border: 0;
  background: #fcff72;
}
@keyframes inhale {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes hold {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes exhale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
</style>

<script lang="ts">
import type RouteParams from "svelte-navigator/types/RouteParam";
import BreathingTopbar from "../components/BreathingTopbar.svelte";
export let query: RouteParams;

const idParam = query.id;
const id = Number(idParam);
import { techniques } from "@/data/exercises";
import { globalHistory } from "svelte-navigator";
let currentAnimationDuration: number;
let currentAnimation = "";
let visualReturn = "";
let isFinished = false;
let alreadyRun = 0;
let repeatTime = 32;

interface IBreathingStep {
  stepTime: number;
  prefixText: string;
  nextStep(): void;
}

function breathingStep({ stepTime, prefixText, nextStep }: IBreathingStep) {
  let stepTimerCounter = stepTime;
  currentAnimationDuration = stepTime;
  visualReturn = `${prefixText} ${stepTimerCounter}`;
  if (!isFinished) {
    if (stepTime !== 0) {
      const stepTimer = setInterval(() => {
        stepTimerCounter--;
        visualReturn = `${prefixText} ${stepTimerCounter}`;
        if (stepTimerCounter <= 0) {
          clearInterval(stepTimer);
          nextStep();
        }
      }, 1000);
    } else {
      nextStep();
    }
  }
}

startBreathing();

function startBreathing() {
  currentAnimation = "";
  breathingStep({
    stepTime: 5,
    prefixText: `Breathing starting in`,
    nextStep: inhale,
  });
}
function inhale() {
  currentAnimation = "inhale";
  breathingStep({
    stepTime: techniques[id].steps[0],
    prefixText: `Inhale for`,
    nextStep: hold,
  });
}
function hold() {
  currentAnimation = "hold";
  breathingStep({
    stepTime: techniques[id].steps[1],
    prefixText: `Hold for`,
    nextStep: exhale,
  });
}
function exhale() {
  currentAnimation = "exhale";
  breathingStep({
    stepTime: techniques[id].steps[2],
    prefixText: `Exhale for`,
    nextStep: rest,
  });
}
function rest() {
  currentAnimation = "";
  breathingStep({
    stepTime: techniques[id].steps[3],
    prefixText: `Take a rest for`,
    nextStep: inhale,
  });
  alreadyRun++;
}
</script>

<BreathingTopbar id="{id}" topbarLabel="Practice" />
<div class="breathing-practice-page">
  <section class="breathing-practice">
    <h3><strong>{repeatTime - alreadyRun}</strong> breaths to go</h3>
    <br />
    <div class="outside">
      <div
        class="inside {currentAnimation}"
        style="animation-duration: {currentAnimationDuration}s;">
      </div>
    </div>
    <br />
    <h3 class="medium">{visualReturn}</h3>
    <br />
    <button class="return-button" on:click="{() => globalHistory.navigate('/')}"
      >Return to see other Breathings</button>
  </section>
</div>
