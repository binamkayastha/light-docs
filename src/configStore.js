import { writable } from "svelte/store";
import { validator } from "@exodus/schemasafe";

export const config = writable(getConfigUrlParam());

export function setConfigUrlParam(newConfigValue) {
  console.log(newConfigValue);
  window.location = "/?config=" + encodeURI(JSON.stringify(newConfigValue));
}

function getConfigUrlParam() {
  const DEFAULT_CONFIG = {
    version: "v0.1",
    data: {
      githubRepos: [
        {
          name: "LightDocs",
          owner: "binamkayastha",
          repo: "light-docs",
          docsLocation: "docs",
        },
      ],
    },
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
