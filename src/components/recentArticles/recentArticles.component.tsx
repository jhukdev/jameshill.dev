import { h } from 'preact';
import { ICollection } from '@/model/collection.model';
import { IArticle } from '@/model/article.model';
import style from './recentArticles.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  className?: string;
  articles: ICollection<IArticle>[];
  limit?: number;
}

/* -----------------------------------
 *
 * Recent
 *
 * -------------------------------- */

function RecentArticles({ className = '', articles, limit = 4 }: IProps) {
  return (
    <ol class={`${style.articles} ${className}`}>
      {articles.map((article) => (
        <li>
          <a href={article.url}>{article.data.title}</a>
        </li>
      ))}
    </ol>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { RecentArticles };
