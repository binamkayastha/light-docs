import { writable } from "svelte/store";

export const config = writable(getConfigUrlParam());

function getConfigUrlParam() {
  const DEFAULT_CONFIG = {
    githubRepos: [
      {
        type: "repo",
        name: "NepalCodes",
        download_url:
          "https://api.github.com/repos/nepalcodes/nepal-codes.github.io/contents/docs",
      },
    ],
  };
  const rawConfigParam = getUrlParam("config", null);
  const configParam = rawConfigParam
    ? JSON.parse(decodeURI(rawConfigParam))
    : DEFAULT_CONFIG;
  return configParam;
}

function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}
