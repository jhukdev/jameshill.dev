/* -----------------------------------
 *
 * IAritcle
 *
 * -------------------------------- */

interface IArticle {
  title: string;
  tagline: string;
  excerpt: string;
  image: string;
  tags: string[];
  draft: boolean;
  date: Date;
  cssPath: string;
  jsPath: string;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IArticle };
