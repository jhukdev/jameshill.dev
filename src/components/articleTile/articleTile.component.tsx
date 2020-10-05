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
      <figure class={style.image}>
        <img src={`https://picsum.photos/seed/${post.title}/420/300`} alt="Post" />
      </figure>
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
