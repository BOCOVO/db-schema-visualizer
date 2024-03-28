module.exports = {
  "*.(tsx|ts)": "yarn tsc",
  "*.(tsx|ts)": ["eslint --fix", "prettier --write"],
  "*.(md|json)": "prettier --write",
};
