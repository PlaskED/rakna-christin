import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, 
	 SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_USER } from '../actions/types'

export default function reducerLogin(state = {
    loginPending: false,
    loginSuccess: false,
    loginError: null, 
    accessToken: null,
    refreshToken: null,
}, action) {
    switch (action.type) {
	case LOGIN_SUCCESS:
	    return {
		...state,
		loginSuccess: action.loginSuccess
	    }
	case LOGIN_PENDING:
	    return {
		...state,
		loginPending: action.loginPending
	    }
	case LOGIN_ERROR:
	    return {
		...state,
		loginError: action.loginError
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
	case SET_USER:
	    return {
		...state,
		user: action.user
	    }
	default:
	    return state
    }
}
