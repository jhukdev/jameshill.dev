import { h } from 'preact';
import { ICollection } from '@/modules/shared/model/collection.model';
import { IArticle } from '@/modules/articles/model/article.model';
import style from './articleList.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  className?: string;
  articles: ICollection<IArticle>[];
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { ArticleTile } from '@/modules/articles/components/articleTile';

/* -----------------------------------
 *
 * Articles
 *
 * -------------------------------- */

function ArticleList({ className = '', articles }: IProps) {
  return (
    <article class={`${style.articles} ${className}`}>
      {articles.map(({ data, url }) => (
        <div class={style.item}>
          <ArticleTile article={data} url={url} />
        </div>
      ))}
    </article>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { ArticleList };
