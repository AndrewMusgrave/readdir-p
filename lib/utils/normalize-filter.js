const globToRegExp = require("glob-to-regexp");

module.exports = function normalizeFilter(filter) {
  if (!filter) return () => false;
  if (typeof filter === "function") return filter;

  const glob = globToRegExp(filter);
  return path => glob.test(path);
};
