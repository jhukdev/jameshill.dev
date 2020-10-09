import { h } from 'preact';
import style from './mainIntro.module.scss';

/* -----------------------------------
 *
 * Intro
 *
 * -------------------------------- */

function MainIntro() {
  return (
    <section class={style.wrapper}>
      <div class={style.container}>
        <em class={style.callout}>Hello</em>
        <em class={style.callout}>there</em>
        <p class={style.text}>
          I'm Tech Lead for all things front-end at
          <i class={style.company} role="img" />
          coupons
        </p>
        <a
          href="https://www.linkedin.com/in/jameshill-dev"
          target="_blank"
          rel="noreferrer"
          class={style.profile}
        >
          Find out more
        </a>
      </div>
    </section>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { MainIntro };
