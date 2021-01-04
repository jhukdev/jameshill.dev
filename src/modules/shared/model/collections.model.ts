import { ICollection } from './collection.model';
import { IArticle } from '@/modules/articles/model/article.model';

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
