<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: min(380px, 100%);
  gap: 8px;
  margin-bottom: 32px;
  h3 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .references {
    margin-left: 32px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>

<script>
import { html } from "@/utils/html";

import { _ } from "svelte-i18n";
</script>

<section class="content" id="stress_control_using_breathing_exercises">
  <h2>{$_("home.stress_control_using_breathing_exercises")}</h2>
  <br />
  <p use:html="{$_('home.stress_control_using_breathing_exercises_content')}">
  </p>
  <h3>{$_("home.references")}</h3>
  <ul class="references">
    <li>
      <a
        href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5455070/"
        target="_blank"
        rel="noopener noreferrer">{$_("home.china_study_name")}</a>
    </li>
  </ul>
</section>
