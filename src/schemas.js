import { validator } from "@exodus/schemasafe";

export function validateConfig(configObj) {
  var topLevelErrors = validateWithErrors(topLevelSchema, configObj);
  if (topLevelErrors) {
    throw topLevelErrors;
  }
  var schemaVersion = configObj["version"];
  var data = configObj["data"];
  var schema = configSchemas[schemaVersion];
  var dataLevelErrors = validateWithErrors(schema, data);
  if (dataLevelErrors) {
    throw dataLevelErrors;
  }
}

function validateWithErrors(schema, dataObj) {
  var validate = validator(schema, { includeErrors: true });
  if (!validate(dataObj)) {
    return JSON.stringify(validate.errors);
  }
  return "";
}

// https://json-schema.org/understanding-json-schema/reference/index.html
const topLevelSchema = {
  type: "object",
  required: ["version", "data"],
  properties: {
    version: {
      type: "string",
      enum: ["v0.1"],
    },
    data: {
      type: "object",
    },
  },
};

const configSchemas = {
  "v0.1": {
    type: "object",
    required: ["githubRepos"],
    additionalProperties: false,
    properties: {
      githubRepos: {
        type: "array",
        minItems: 1,
        contains: {
          type: "object",
          required: ["owner", "repo", "docsLocation"],
          additionalProperties: false,
          properties: {
            name: {
              type: "string",
            },
            owner: {
              type: "string",
            },
            repo: {
              type: "string",
            },
            docsLocation: {
              type: "string",
            },
          },
        },
      },
    },
  },
};
