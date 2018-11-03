import { UNREAD_PENDING, UNREAD_SUCCESS, 
	 UNREAD_ERROR, SET_UNREAD, CHANGE_UNREAD_PENDING,
	 CHANGE_UNREAD_SUCCESS, CHANGE_UNREAD_ERROR, 
	 INCREASE_UNREAD, DECREASE_UNREAD } from '../actions/types'

export default function reducerUnread(state = {
    unreadPending: false,
    unreadSuccess: false,
    unreadError: null,
    changeUnreadPending: false,
    changeUnreadSuccess: false,
    changeUnreadError: null,
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
	case INCREASE_UNREAD:
	    return {
		...state,
		unread: state.unread + 1
	    }
	case DECREASE_UNREAD:
	    return {
		...state,
		unread: state.unread - 1
	    }
	case CHANGE_UNREAD_SUCCESS:
	    return {
		...state,
		changeUnreadSuccess: action.changeUnreadSuccess
	    }
	case CHANGE_UNREAD_PENDING:
	    return {
		...state,
		changeUnreadPending: action.changeUnreadPending
	    }
	case CHANGE_UNREAD_ERROR:
	    return {
		...state,
		changeUnreadError: action.changeUnreadError
	    }
	default:
	    return state
    }
}
