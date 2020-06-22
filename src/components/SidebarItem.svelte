<script>
  export let mdIcon;
  export let text;
</script>

<style>
  .sidebar-item {
    padding: 16px;
    /* background-color: lightblue; */
    /* border: 2px solid white; */
    /* border-radius: 4px; */
    border-bottom: 1px solid #ccc;
  }
  .sidebar-item:hover {
    background-color: #efefef;
    /* background-color: #72a1e5; */
  }
</style>

<div
  style="display: flex; align-items: center;"
  class="sidebar-item waves-effect"
  on:click>
  <i class="material-icons">{mdIcon}</i>
  <div style="margin-right: 16px" />
  {text}
</div>
