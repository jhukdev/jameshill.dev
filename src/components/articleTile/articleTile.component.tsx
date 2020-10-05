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
      <a href={url} class={style.link}>
        <img
          src={`https://picsum.photos/seed/${post.title}/450/600`}
          class={style.image}
          alt="Post"
        />
        <div class={style.content}>
          <h3 class={style.title}>
            <span>{post.title}</span>
          </h3>
          <p class={style.text}>{post.excerpt}</p>
        </div>
      </a>
    </section>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { ArticleTile };
