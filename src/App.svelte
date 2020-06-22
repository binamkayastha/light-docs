<script>
  // Poor persons livereload xD
  //   setTimeout(function () {
  //     window.location.reload(1);
  //   }, 3000);
  ////  }, 10000);

  // Potentially use githubs markdown procesor instead
  // Potentially add mermaid plugin
  // https://www.npmjs.com/search?q=keywords%3Amarkdown-it-plugin%20mermaid
  import * as marked from "marked";

  const org = "nepalcodes";
  const repo = "nepal-codes.github.io";
  let baseURL = `https://api.github.com/repos/${org}/${repo}/contents/docs`;
  updateSidebar(baseURL);
  let sidebarItems = ["Loading"];

  async function updateSidebar(url) {
    console.log("Sidebar updating");
    console.log("Sidebar url: " + url);
    const responsePromise = await fetch(url);
    console.log("resp: " + responsePromise);
    sidebarItems = JSON.parse(await responsePromise.text());
    baseURL = url;
    // Todo write verifing code
    // expect sidebarItems to be a list of elements with name, download_url, etc.
    // also filter based on that
  }

  async function updateDocWindow(url) {
    console.log("UPDATE DOC WINDOW CALLED");
    const rawMDFile = await getMDFile(url);
    console.log("RAW MD FILE");
    console.log(rawMDFile);
    // debugger;
    const mdFile = marked.default(rawMDFile);
    console.log(mdFile);
    document.getElementById("docWindow").innerHTML = mdFile;
  }

  async function getMDFile(url) {
    console.log("GET MD FILE CALLED");
    const responsePromise = await fetch(url);
    const rawMDFile = await responsePromise.text();
    return rawMDFile;
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  #sidebar {
    width: 320px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /*should match sidebar-item border-radius*/
    /* padding: 4px;  */
    border-right: 1px solid grey;
  }
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
  #docWindow {
    padding: 32px;
  }
</style>

<svelte:head>
  <!-- Compiled and minified CSS -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />

  <!-- Compiled and minified JavaScript -->
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js">

  </script>
  <!-- Icons -->
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet" />

</svelte:head>

<main>
  <div style="display: flex; flex-direction: column; min-height: 100vh;">
    <nav style="background-color: #7011e4;">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Light Docs</a>
      </div>
    </nav>

    <div
      style=" flex-grow: 1; /* Take up the reset of the height in the window */
      display: flex; flex-direction: row; align-items: stretch; ">
      <div id="sidebar">
        <div
          class="sidebar-item waves-effect"
          style="display: flex; align-items: center;"
          on:click={() => {
            updateSidebar(baseURL
                .split('/')
                .slice(0, baseURL.split('/').length - 1)
                .join('/'));
          }}>
          <i class="material-icons">arrow_upward</i>
          <div style="margin-right: 16px" />
          go up one folder
        </div>
        {#each sidebarItems as sidebarItem}
          {#if sidebarItem.type == 'file'}
            <div
              class="sidebar-item waves-effect"
              style="display: flex; align-items: center;"
              on:click={() => {
                updateDocWindow(sidebarItem.download_url);
              }}>
              <i class="material-icons">text_snippet</i>
              <div style="margin-right: 16px" />
              {sidebarItem.name}
            </div>
          {:else if sidebarItem.type == 'dir'}
            <div
              class="sidebar-item waves-effect"
              style="display: flex; align-items: center;"
              on:click={() => {
                updateSidebar(baseURL + '/' + sidebarItem.name);
              }}>
              <i class="material-icons">folder</i>
              <div style="margin-right: 16px" />
              {sidebarItem.name}
            </div>
          {/if}
        {/each}
      </div>
      <div id="docWindow">Loading</div>
    </div>
  </div>

</main>
