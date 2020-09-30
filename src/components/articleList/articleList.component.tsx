import { h } from 'preact';
import style from './articleList.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  articles: any[];
}

/* -----------------------------------
 *
 * Articles
 *
 * -------------------------------- */

function ArticleList({ articles }: IProps) {
  return (
    <article class={style.articles}>
      {articles.map((article) => (
        <div>{article.title}</div>
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
