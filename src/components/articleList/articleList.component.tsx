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
        <div>
          <img src={`https://picsum.photos/seed/${article.id}/800/240`} alt="Post" />
          <h3>{article.title}</h3>
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
