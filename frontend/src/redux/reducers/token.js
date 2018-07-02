import { TOKEN_REFRESH_PENDING, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR } from "../actions/types"

export default function reducerToken(state = {
    tokenRefreshPending: false,
    tokenRefreshSuccess: false,
    tokenRefreshError: false, 
}, action) {
    switch (action.type) {
	case TOKEN_REFRESH_PENDING:
	    return {
		...state,
		tokenRefreshPending: action.tokenRefreshPending
	    };
	case TOKEN_REFRESH_SUCCESS:
	    return {
		...state,
		tokenRefreshSuccess: action.tokenRefreshSuccess
	    };
	case TOKEN_REFRESH_ERROR:
	    return {
		...state,
		tokenRefreshError: action.tokenRefreshError
	    };
	default:
	    return state;
    }
}
