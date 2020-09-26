import { hydrate } from '@/utility/hydrate.utility';
import { Header as Component } from './header.component';

/* -----------------------------------
 *
 * Home
 *
 * -------------------------------- */

const Header = hydrate(Component);

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */
export { Header };
