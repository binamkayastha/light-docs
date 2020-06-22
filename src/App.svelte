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
  import SidebarItem from "./components/SidebarItem.svelte";

  let githubRepos = [
    {
      type: "repo",
      name: "NepalCodes",
      download_url:
        "https://api.github.com/repos/nepalcodes/nepal-codes.github.io/contents/docs"
    },
    {
      type: "repo",
      name: "Handbook",
      download_url: "https://api.github.com/repos/nepalcodes/handbook/contents/"
    },
    {
      type: "repo",
      name: "Resources",
      download_url:
        "https://api.github.com/repos/nepalcodes/resources/contents/"
    }
  ];
  $: githubRepoURLs = githubRepos.map(repo => repo.download_url);
  $: githubOneFolderAboveDocURLs = githubRepos.map(repo =>
    repo.download_url
      .split("/")
      .slice(0, repo.download_url.split("/").length - 1)
      .join("/")
  );
  let currentFolderURL = "";
  let sidebarItems = githubRepos;
  let mdFile = "<--- Choose Repo, Folder, or File";

  async function updateSidebar(url) {
    if (githubOneFolderAboveDocURLs.includes(url)) {
      console.log("Updating Sidebar to GithubRepos");
      sidebarItems = githubRepos;
      return;
    }
    console.log("Updating Sidebar files and folders in this URL: " + url);
    const responsePromise = await fetch(url);
    if (githubRepoURLs.includes(url)) {
      sidebarItems = [{ type: "goUp", name: "go back to repos" }];
    } else {
      sidebarItems = [{ type: "goUp", name: "go up one folder" }];
    }
    sidebarItems = sidebarItems.concat(
      JSON.parse(await responsePromise.text())
    );

    currentFolderURL = url;
    mdFile = "<--- Choose Repo, Folder, or File";
    // Todo write verifing code
    // expect sidebarItems to be a list of elements with name, download_url, etc.
    // also filter based on that
  }

  async function updateDocWindow(url) {
    console.log("Updating Documentation Window with this url: " + url);
    const rawMDFile = await getMDFile(url);
    mdFile = marked.default(rawMDFile);
    // Todo sanitize output HTML
    // https://www.npmjs.com/package/marked
    // Warning: 🚨 Marked does not sanitize the output HTML. Please use a
    // sanitize library, like DOMPurify (recommended), sanitize-html or insane
    // on the output HTML! 🚨
  }

  async function getMDFile(url) {
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
  #docWindow {
    padding: 32px;
  }
</style>

<svelte:head>
  <!-- Compiled and minified CSS -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />

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
        {#each sidebarItems as sidebarItem}
          {#if sidebarItem.type == 'repo'}
            <SidebarItem
              mdIcon="book"
              text={sidebarItem.name}
              on:click={() => {
                updateSidebar(sidebarItem.download_url);
              }} />
          {:else if sidebarItem.type == 'goUp'}
            <SidebarItem
              mdIcon="arrow_upward"
              text={sidebarItem.name}
              on:click={() => {
                updateSidebar(currentFolderURL
                    .split('/')
                    .slice(0, currentFolderURL.split('/').length - 1)
                    .join('/'));
              }} />
          {:else if sidebarItem.type == 'file'}
            <SidebarItem
              mdIcon="text_snippet"
              text={sidebarItem.name}
              on:click={() => {
                updateDocWindow(sidebarItem.download_url);
              }} />
          {:else if sidebarItem.type == 'dir'}
            <SidebarItem
              mdIcon="folder"
              text={sidebarItem.name}
              on:click={() => {
                updateSidebar(currentFolderURL + '/' + sidebarItem.name);
              }} />
          {/if}
        {/each}
      </div>
      <div id="docWindow">
        {@html mdFile}
      </div>
    </div>
  </div>

</main>
