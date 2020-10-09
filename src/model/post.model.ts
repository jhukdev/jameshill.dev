/* -----------------------------------
 *
 * IPost
 *
 * -------------------------------- */

interface IPost {
  title: string;
  tagline: string;
  excerpt: string;
  image: string;
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
