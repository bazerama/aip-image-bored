export const GET_THREADS_REQUEST = 'get-threads-request';
export const GET_THREADS_SUCCESS = 'get-threads-success';
export const GET_THREADS_FAILURE = 'get-threads-failure';
export const GET_REPLIES_REQUEST = 'get-replies-request';
export const GET_REPLIES_SUCCESS = 'get-replies-success';
export const GET_REPLIES_FAILURE = 'get-replies-failure';
export const REACTION_REQUEST = 'reaction-request';
export const REACTION_SUCCESS = 'reaction-success';
export const REACTION_FAILURE = 'reaction-failure';

const initialStateThreads = {
    success: false,
    isLoading: true,
    threads: [],
    threadsErrorMessage: '',
};

export function getThreads(state = initialStateThreads, action) {
    switch (action.type) {
        case GET_THREADS_REQUEST:
            return {
                isLoading: true,
            };
        case GET_THREADS_SUCCESS:
            return {
                success: true,
                threads: action.threads,
                isLoading: false,
            };
        case GET_THREADS_FAILURE:
            return {
                success: false,
                isLoading: false,
                threadsErrorMessage: action.error,
            };
        default:
            return state;
    }
}

const initialStateReplies = {
    success: false,
    isLoading: true,
    replies: [],
    repliesErrorMessage: '',
};

export function getReplies(state = initialStateReplies, action) {
    switch (action.type) {
        case GET_REPLIES_REQUEST:
            return {
                isLoading: true,
            };
        case GET_REPLIES_SUCCESS:
            return {
                success: true,
                replies: action.replies,
                isLoading: false,
            };
        case GET_REPLIES_FAILURE:
            return {
                success: false,
                isLoading: false,
                repliesErrorMessage: action.error,
            };
        default:
            return state;
    }
}

const initialStateReactions = {
    success: false,
    isPending: true,
    reaction: [],
    reactionErrorMessage: '',
};

export function reaction(state = initialStateReactions, action) {
    switch (action.type) {
        case REACTION_REQUEST:
            return {
                isPending: true,
            };
        case REACTION_SUCCESS:
            return {
                success: true,
                reaction: action.reaction,
                isPending: false,
            };
        case REACTION_FAILURE:
            return {
                success: false,
                isPending: false,
                reactionErrorMessage: action.error,
            };
        default:
            return state;
    }
}
