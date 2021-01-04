import { h } from 'preact';
import style from './profileImage.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  className?: string;
}

/* -----------------------------------
 *
 * Images
 *
 * -------------------------------- */

import profileImage from '@/styles/images/me.jpg';

/* -----------------------------------
 *
 * Profile
 *
 * -------------------------------- */

function ProfileImage({ className = '' }: IProps) {
  return (
    <figure class={`${style.profile} ${className}`}>
      <div class={style.image}>
        <img src={profileImage} alt="James Hill" loading="lazy" />
      </div>
      <figcaption class={style.caption}>
        <em>
          Tech Lead <span>@groupon</span>
        </em>
        <p>Trying to build a better UI.</p>
        <p>Generally pleasant fellow..</p>
      </figcaption>
    </figure>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { ProfileImage };
