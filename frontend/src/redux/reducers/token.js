import { TOKEN_REFRESH_PENDING, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR,
    SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from '../actions/types'

export default function reducerToken(state = {
    tokenRefreshPending: false,
    tokenRefreshSuccess: false,
    tokenRefreshError: null,
    accessToken: null,
    refreshToken: null
}, action) {
    switch (action.type) {
	case TOKEN_REFRESH_PENDING:
	    return {
		...state,
		tokenRefreshPending: action.tokenRefreshPending
	    }
	case TOKEN_REFRESH_SUCCESS:
	    return {
		...state,
		tokenRefreshSuccess: action.tokenRefreshSuccess
	    }
	case TOKEN_REFRESH_ERROR:
	    return {
		...state,
		tokenRefreshError: action.tokenRefreshError
	    }
	case SET_ACCESS_TOKEN:
	    return {
		...state,
		accessToken: action.accessToken
	    }
	case SET_REFRESH_TOKEN:
	    return {
		...state,
		refreshToken: action.refreshToken
	    }
	default:
	    return state
    }
}
