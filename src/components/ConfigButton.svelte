<script>
  import { config, setConfigUrlParam } from "../configStore.js";
  import { validateConfig } from "../schemas.js";
  import { onMount } from "svelte";

  let error_msg = "";

  onMount(async () => {
    isConfigValid();
  });

  function onSave() {
    if (!isConfigValid()) {
      return;
    }
    const configObj = JSON.parse(
      document.getElementById("config-textarea").value
    );
    $config = configObj;
    setConfigUrlParam($config);
  }

  function isConfigValid() {
    console.log("isConfigValid Called");
    error_msg = "";
    try {
      var configObj = JSON.parse(
        document.getElementById("config-textarea").value
      );
      console.log(validateConfig(configObj));
    } catch (error) {
      error_msg = error;
      return false;
    }
    return true;
  }
</script>

<style>
  .modal-content {
    color: #000;
  }
  .bottom-part {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 8px;
  }
</style>

<div>
  <!-- Modal Trigger -->
  <div class="modal-trigger right" style="margin-right: 10px" href="#modal1">
    <i class="material-icons">settings</i>
  </div>

  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Configuration</h4>
      <textarea
        id="config-textarea"
        class="materialize-textarea"
        on:input={() => isConfigValid()}>
        {JSON.stringify($config, null, 2)}
      </textarea>
    </div>
    {#if error_msg}
      <div class="red">{error_msg}</div>
    {/if}
    <div class="bottom-part">
      <div class="btn-flat modal-close waves-effect waves-green">Cancel</div>
      <div
        class="btn modal-close waves-effect waves-green"
        on:click={() => {
          onSave();
        }}>
        Save
      </div>
    </div>
  </div>

</div>
