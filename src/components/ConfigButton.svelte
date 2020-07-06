<script>
  import { config } from "../configStore.js";
  function onSave() {
    $config = JSON.parse(document.getElementById("config-textarea").value);
    console.log("/?config=" + encodeURI(JSON.stringify($config)));
    window.location = "/?config=" + encodeURI(JSON.stringify($config));
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
      <textarea id="config-textarea" class="materialize-textarea">
        {JSON.stringify($config, null, 2)}
      </textarea>
    </div>
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
