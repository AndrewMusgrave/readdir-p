const { lstat } = require("fs");

module.exports = function isDirectory(path) {
  return new Promise((resolve, reject) => {
    lstat(path, (err, stats) => {
      if (err) reject(err);
      resolve(stats.isDirectory());
    });
  });
};
