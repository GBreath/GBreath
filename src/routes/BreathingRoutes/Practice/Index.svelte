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
</style>

<script lang="ts">
import type RouteParams from "svelte-navigator/types/RouteParam";
import BreathingTopbar from "../components/BreathingTopbar.svelte";
export let query: RouteParams;

const idParam = query.id;
const id = Number(idParam);
</script>

<BreathingTopbar id="{id}" topbarLabel="Practice" />
<div class="breathing-practice-page">
  <section class="breathing-practice">
    <h3>Not working yet!</h3>
  </section>
</div>
