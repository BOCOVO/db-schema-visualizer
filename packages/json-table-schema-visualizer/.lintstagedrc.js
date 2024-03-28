module.exports = {
  // because of lint-stages is installed as deps of root
  // we need to cd to `packages/json-table-schema-visualizer` before running tsc
  // otherwise it will not use the right tsconfig and context
  "*.(tsx|ts)": () =>
    "cd packages/json-table-schema-visualizer && yarn tsc --noEmit",
  "*.(tsx|ts|js)": ["eslint --fix", "prettier --write"],
  "*.(md|json)": "prettier --write",
};
