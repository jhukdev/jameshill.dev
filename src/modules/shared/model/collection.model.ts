/* -----------------------------------
 *
 * ICollection
 *
 * -------------------------------- */

interface ICollection<T> {
  inputPath: string;
  fileSlug: string;
  filePathStem: string;
  data: T;
  date: string;
  outputPath: string;
  url: string;
  templateContent: string;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { ICollection };
