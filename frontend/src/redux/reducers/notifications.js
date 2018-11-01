import { NOTIFICATIONS_PENDING, NOTIFICATIONS_SUCCESS, NOTIFICATIONS_ERROR,
	 NOTIFICATIONS_SET_SCROLLABLE, NOTIFICATIONS_ADD_ELEMENTS, 
	 NOTIFICATIONS_REMOVE_PENDING, NOTIFICATIONS_REMOVE_SUCCESS, 
	 NOTIFICATIONS_REMOVE_ERROR, NOTIFICATIONS_REMOVE_ELEMENT,
	 CHANGE_UNREAD } from '../actions/types'

export default function reducerNotifications(state = {
    notificationsPending: false, 
    notificationsError: null, 
    notificationsSuccess: false, 
    notificationsScrollable: true,
    noticationRemovePending: false,
    noticationRemoveSuccess: false,
    noticationRemoveError: null,
    notifications: [],
}, action) {
    switch (action.type) {
	case NOTIFICATIONS_SUCCESS:
	    return {
		...state,
		notificationsSuccess: action.notificationsSuccess
	    }
	case NOTIFICATIONS_PENDING:
	    return {
		...state,
		notificationsPending: action.notificationsPending
	    }
	case NOTIFICATIONS_ERROR:
	    return {
		...state,
		notificationsError: action.notificationsError
	    }
	case NOTIFICATIONS_SET_SCROLLABLE:
	    return {
		...state,
		notificationsScrollable: action.notificationsScrollable
	    }
	case NOTIFICATIONS_REMOVE_SUCCESS:
	    return {
		...state,
		notificationRemoveSuccess: action.notificationRemoveSuccess
	    }
	case NOTIFICATIONS_REMOVE_PENDING:
	    return {
		...state,
		notificationRemovePending: action.notificationRemovePending
	    }
	case NOTIFICATIONS_REMOVE_ERROR:
	    return {
		...state,
		notificationRemoveError: action.notificationRemoveError
	    }
	case NOTIFICATIONS_REMOVE_ELEMENT:
	    return {
		...state,
		notifications: state.notifications.filter(it => it.id !== action.removeId)
	    }
	case NOTIFICATIONS_ADD_ELEMENTS:
	    return {
		...state,
		notifications: state.notifications.concat(action.newNotifications)
	    }
	case CHANGE_UNREAD:
	    return {
		...state,
		notifications: state.notifications.map(it => 
		    it.id === action.changeUnread.id ? { ...it, checked: action.changeUnread.checked } : it )
	    }
	default:
	    return state
    }
}
