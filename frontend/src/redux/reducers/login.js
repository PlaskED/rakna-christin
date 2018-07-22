import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/types'

export default function reducerLogin(state = {
    loginPending: false,
    loginSuccess: false,
    loginError: null, 
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
	default:
	    return state
    }
}
