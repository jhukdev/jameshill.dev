import { h } from 'preact';
import { IPost } from '@/model/post.model';
import style from './articleTile.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  post: IPost;
  url: string;
  className?: string;
}

/* -----------------------------------
 *
 * Article
 *
 * -------------------------------- */

function ArticleTile({ post, url, className = '' }: IProps) {
  return (
    <section class={`${style.tile} ${className}`}>
      <a href={url} class={style.image}>
        <img src={`/articles/_images/${post.image}`} alt="Post" />
      </a>
      <div class={style.content}>
        <h2 class={style.title}>
          <a href={url} class={style.link}>
            <span>{post.title}</span>
          </a>
        </h2>
        <h3 class={style.tagline}>{post.tagline}</h3>
        <p class={style.excerpt}>{post.excerpt}</p>
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
