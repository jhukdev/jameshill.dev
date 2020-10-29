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
      <img src={profileImage} class={style.image} alt="James Hill" />
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
