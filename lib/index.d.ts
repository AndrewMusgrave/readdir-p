declare function readdirp(
  path: string,
  onFile: readdirp.FileHandler,
  onDirectory: readdirp.FileHandler,
  options: Readdirp.Options
): Promise<>;

declare function readdirp(
  path: string,
  onFile: readdirp.FileHandler,
  onDirectory: readdirp.FileHandler,
  onEnd: (err: Error | null) => void,
  options: Readdirp.Options
): void;

declare namespace readdirp {
  type FileHandler = ((path: string) => void) | null;
  type FileFilter = ((path: string) => boolean) | string;

  interface Options {
    fileFilter?: FileFilter;
    directoryFilter?: FileFilter;
  }
}

export = readdirp;
