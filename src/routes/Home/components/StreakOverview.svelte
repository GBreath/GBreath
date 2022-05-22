<style lang="scss" scoped>
.streak-overview {
  background: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: min(380px, 100% - 32px);
  min-height: 100px;
  border-radius: 16px;
  padding: 16px;
  .separator {
    border: 1px solid #000;
    height: 46px;
    border-radius: 10px;
  }
  .streak-overview-item {
    display: grid;
    place-items: center;
    small {
      font-size: 10px;
      font-weight: 300;
      color: #333;
    }
    p {
      font-size: 20px;
      font-weight: 400;
    }
  }
}
</style>

<script lang="ts">
import { _ } from "svelte-i18n";
</script>

<section class="streak-overview">
  <div class="streak-overview-item">
    <small>{$_("home.streak.YOURSTREAK")}</small>
    <p>10 {$_("home.streak.Days")}</p>
  </div>
  <div class="separator"></div>
  <div class="streak-overview-item">
    <small>{$_("home.streak.YOURGOAL")}</small>
    <p>90 {$_("home.streak.Days")}</p>
  </div>
</section>
