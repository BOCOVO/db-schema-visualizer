module.exports = {
  "*.(tsx|ts)": "tsc",
  "*.(tsx|ts|js)": ["eslint --fix", "prettier --write"],
  "*.(md|json)": "prettier --write",
};
