module.exports = {
  "*.(tsx|ts)": () => "yarn tsc-files --noEmit",
  "*.(tsx|ts|js)": ["eslint --fix", "prettier --write"],
  "*.(md|json)": "prettier --write",
};
