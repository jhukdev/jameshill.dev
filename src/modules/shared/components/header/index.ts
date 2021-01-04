import { Header as Component } from './header.component';
import { applyHydration } from '@/utility/hydrate.utility';

/* -----------------------------------
 *
 * Home
 *
 * -------------------------------- */

const Header = applyHydration('Header', Component);

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */
export { Header };