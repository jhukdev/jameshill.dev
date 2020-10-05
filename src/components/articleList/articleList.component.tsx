import { h } from 'preact';
import { ICollection } from '@/model/collection.model';
import { IPost } from '@/model/post.model';
import style from './articleList.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  articles: ICollection<IPost>[];
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
          <ArticleTile post={data} url={url} />
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
