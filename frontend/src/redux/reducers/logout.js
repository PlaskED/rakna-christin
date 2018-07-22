import { LOGOUT_PENDING, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../actions/types'

export default function reducerLogout(state = {
    logoutPending: false,
    logoutSuccess: false,
    logoutError: null, 
}, action) {
    switch (action.type) {
	case LOGOUT_SUCCESS:
	    return {
		...state,
		logoutSuccess: action.logoutSuccess
	    }
	case LOGOUT_PENDING:
	    return {
		...state,
		logoutPending: action.logoutPending
	    }
	case LOGOUT_ERROR:
	    return {
		...state,
		logoutError: action.logoutError
	    }
	default:
	    return state
    }
}
