const isDirectory = require("./is-directory");
const normalizeFilter = require("./normalize-filter");
const { readdir } = require("fs");
const { join } = require("path");

module.exports = function readdirRecursive(
  path,
  onFile,
  onDirectory,
  onEnd,
  options = {}
) {
  const { fileFilter, directoryFilter } = options;
  const fFilter = normalizeFilter(fileFilter);
  const dFilter = normalizeFilter(directoryFilter);

  readdir(path, (err, files) => {
    if (err) {
      onEnd(err);
      return;
    }

    const dirs = files.map(f => join(path, f));
    let dirsLeft = dirs.length;

    if (!dirsLeft) return onEnd(null);

    for (const dir of dirs) {
      isDirectory(dir)
        .then(isDir => {
          if (isDir && !dFilter(dir)) {
            onDirectory(dir);
            readdirRecursive(
              dir,
              onFile,
              onDirectory,
              () => {
                if (!--dirsLeft) return onEnd(null);
              },
              options
            );

            return;
          } else if (!isDir && !fFilter(dir)) {
            onFile(dir);
          }

          if (!--dirsLeft) return onEnd(null);
        })
        .catch(err => {
          onEnd();
          return;
        });
    }
  });
};
