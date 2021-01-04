import { h } from 'preact';
import { IArticle } from '@/modules/articles/model/article.model';
import style from './articleTile.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  article: IArticle;
  url: string;
  className?: string;
}

/* -----------------------------------
 *
 * Article
 *
 * -------------------------------- */

function ArticleTile({ article, url, className = '' }: IProps) {
  return (
    <section class={`${style.tile} ${className}`}>
      <a href={url} class={style.image}>
        <img src={`/articles/_images/${article.image}`} alt="Post" loading="lazy" />
      </a>
      <div class={style.content}>
        <h2 class={style.title}>
          <a href={url} class={style.link}>
            {article.title}
          </a>
        </h2>
        <h3 class={style.tagline}>{article.tagline}</h3>
        <p class={style.excerpt}>{article.excerpt}</p>
      </div>
    </section>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { ArticleTile };
