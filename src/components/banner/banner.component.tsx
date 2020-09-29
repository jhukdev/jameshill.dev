import { h } from 'preact';
import style from './banner.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  children: any;
}

/* -----------------------------------
 *
 * Footer
 *
 * -------------------------------- */

function Banner({ children }: IProps) {
  return (
    <section class={style.banner}>
      <div class={style.container}>{children}</div>
    </section>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Banner };
