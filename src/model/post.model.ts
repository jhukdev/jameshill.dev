/* -----------------------------------
 *
 * IPost
 *
 * -------------------------------- */

interface IPost {
  title: string;
  excerpt: string;
  tags: string[];
  cssPath: string;
  jsPath: string;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IPost };
