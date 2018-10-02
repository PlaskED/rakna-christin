import { UNREAD_PENDING, UNREAD_SUCCESS, 
	 UNREAD_ERROR, SET_UNREAD } from '../actions/types'

export default function reducerUnread(state = {
    unreadPending: false,
    unreadSuccess: false,
    unreadError: null,
    unread: 0,
}, action) {
    switch (action.type) {
	case UNREAD_SUCCESS:
	    return {
		...state,
		unreadSuccess: action.unreadSuccess
	    }
	case UNREAD_PENDING:
	    return {
		...state,
		unreadPending: action.unreadPending
	    }
	case UNREAD_ERROR:
	    return {
		...state,
		unreadError: action.unreadError
	    }
	case SET_UNREAD:
	    return {
		...state,
		unread: action.unread
	    }
	default:
	    return state
    }
}
