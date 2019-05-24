const readdirRecursive = require("./utils/readdir-recursive");

module.exports = function readdirp(
  path,
  onFile,
  onDirectory,
  valueOne,
  valueTwo = {}
) {
  if (typeof valueOne === "function") {
    readdirRecursive(path, onFile, onDirectory, valueOne, valueTwo);
    return;
  }

  return new Promise((resolve, reject) => {
    readdirRecursive(
      path,
      onFile,
      onDirectory,
      err => {
        if (err) reject(err);
        resolve();
      },
      valueOne
    );
  });
};
