import { createBrowserHistory } from 'history';

/**
 * This service can be used to push between pages by creating an
 * artificial browser history. However, this feature was never fully utilised
 * It is still used in user.actions.js to push between /login and /register pages
 * With the correct props setup, it could be used to prevent unnecessary page reloads
 * Hence, it has been left in for reference
 */

export const history = createBrowserHistory();
