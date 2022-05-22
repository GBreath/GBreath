<style lang="scss">
.settings-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  h2 {
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    outline: none;
  }
}
</style>

<script type="ts">
import Icon from "@iconify/svelte";
import { _ } from "svelte-i18n";
import { Link } from "svelte-navigator";
</script>

<header class="settings-topbar">
  <h2>{$_("settings.settings")}</h2>
  <Link to="/">
    <Icon
      icon="entypo:chevron-small-left"
      style="width: 32px !important; height: 32px !important;" />
  </Link>
</header>
