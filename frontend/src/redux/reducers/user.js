import { USER_PENDING, USER_SUCCESS,
	 USER_ERROR, SET_USER } from '../actions/types'

export default function reducerUser(state = {
    userPending: false,
    userSuccess: false,
    userError: null, 
    user: null
}, action) {
    switch (action.type) {
	case USER_SUCCESS:
	    return {
		...state,
		userSuccess: action.userSuccess
	    }
	case USER_PENDING:
	    return {
		...state,
		userPending: action.userPending
	    }
	case USER_ERROR:
	    return {
		...state,
		userError: action.userError
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
