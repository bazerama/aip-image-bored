import { getThreads, getReplies, react } from '../services/forumpost.service';

/**
 * Some of the following code utilises the snippet:
 *      return dispatch => { ... }
 * This is taken from https://github.com/reduxjs/redux-thunk and allows
 * for action creators to return a function instead of an action.
 * This also helps with calls to async functions, like checkCredentials()
 */

export function getThreadsAction() {
    return dispatch => {
        dispatch({ type: 'get-threads-request' });
        getThreads().then(
            threads => {
                dispatch({ type: 'get-threads-success', threads: threads });
            },
            error => {
                dispatch({ type: 'get-threads-failure', error: error });
            }
        );
    };
}

export function getRepliesAction(replies) {
    return dispatch => {
        dispatch({ type: 'get-replies-request' });
        getReplies(replies).then(
            replies => {
                dispatch({ type: 'get-replies-success', replies: replies });
            },
            error => {
                dispatch({ type: 'get-replies-failure', error: error });
            }
        );
    };
}

export function reactAction(reactionId, postId, mode) {
    return dispatch => {
        dispatch({ type: 'reaction-request' });
        react(reactionId, postId, mode).then(
            reaction => {
                dispatch({ type: 'reaction-success', reaction: reaction });
            },
            error => {
                dispatch({ type: 'reaction-error', error: error });
            }
        );
    };
}
