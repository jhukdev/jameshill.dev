import { ICollection } from './collection.model'
import { IArticle } from './article.model';

/* -----------------------------------
 *
 * ICollection
 *
 * -------------------------------- */

interface ICollections {
  articles: ICollection<IArticle>[];
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { ICollections };
