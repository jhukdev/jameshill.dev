import { h } from 'preact';
import { ICollection } from '@/model/collection.model';
import { IArticle } from '@/model/article.model';
import style from './articleList.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  articles: ICollection<IArticle>[];
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { ArticleTile } from '@/components/articleTile';

/* -----------------------------------
 *
 * Articles
 *
 * -------------------------------- */

function ArticleList({ articles }: IProps) {
  return (
    <article class={style.articles}>
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
