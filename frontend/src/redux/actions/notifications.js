import axios from 'axios'
import { NOTIFICATIONS_PENDING, NOTIFICATIONS_SUCCESS, NOTIFICATIONS_ERROR,
	 NOTIFICATIONS_SET_SCROLLABLE, NOTIFICATIONS_ADD_ELEMENTS, 
	 NOTIFICATIONS_REMOVE_PENDING, NOTIFICATIONS_REMOVE_SUCCESS, 
	 NOTIFICATIONS_REMOVE_ERROR, NOTIFICATIONS_REMOVE_ELEMENT } from './types'
import { decreaseUnread } from './unread'
import { api } from '../../globals'

function setNotificationsPending(notificationsPending) {
    return {
	type: NOTIFICATIONS_PENDING,
	notificationsPending
    }
}

function setNotificationsSuccess(notificationsSuccess) {
    return {
	type: NOTIFICATIONS_SUCCESS,
	notificationsSuccess
    }
}

function setNotificationsError(notificationsError) {
    return {
	type: NOTIFICATIONS_ERROR,
	notificationsError
    }
}

function setNotificationsScrollable(notificationsScrollable) {
    return {
	type: NOTIFICATIONS_SET_SCROLLABLE,
	notificationsScrollable
    }
}

function setNotificationRemovePending(notificationRemovePending) {
    return {
	type: NOTIFICATIONS_REMOVE_PENDING,
	notificationRemovePending
    }
}

function setNotificationRemoveSuccess(notificationRemoveSuccess) {
    return {
	type: NOTIFICATIONS_REMOVE_SUCCESS,
	notificationRemoveSuccess
    }
}

function setNotificationRemoveError(notificationRemoveError) {
    return {
	type: NOTIFICATIONS_REMOVE_ERROR,
	notificationRemoveError
    }
}

export function removeNotification(removeId) {
    return {
	type: NOTIFICATIONS_REMOVE_ELEMENT,
	removeId
    }
}

export function addNotifications(newNotifications) {
    return {
	type: NOTIFICATIONS_ADD_ELEMENTS,
	newNotifications
    }
}

function callGetNotificationsApi(token, index, cb) {
    setTimeout(() => {
	axios({
	    method:'get',
	    url: api.concat('/notifications/'+index),
	    headers: {
		Authorization: 'Bearer '.concat(token)
	    }
	}).then(function(response) {
	    return cb(response)
	}).catch(function(err) {
	    return cb(err)
	})
    }, 3000)
}

function callRemoveNotificationApi(token, removeId, cb) {
    setTimeout(() => {
	axios({
	    method:'delete',
	    url: api.concat('/notification/delete/'+removeId),
	    headers: {
		Authorization: 'Bearer '.concat(token)
	    }
	}).then(function(response) {
	    return cb(response)
	}).catch(function(err) {
	    return cb(err)
	})
    }, 3000)
}

export function getNotifications(token, index) {
    return dispatch => {
	dispatch(setNotificationsPending(true))
	dispatch(setNotificationsSuccess(false))
	dispatch(setNotificationsError(null))
	dispatch(setNotificationsScrollable(false))
	
	callGetNotificationsApi(token, index, cb => {
	    dispatch(setNotificationsPending(false))
	    if (cb.status === 200) {
		dispatch(addNotifications(cb.data.data))
		dispatch(setNotificationsSuccess(true))
	    } else {
		dispatch(setNotificationsSuccess(false))
		dispatch(setNotificationsError(cb))
	    }
	    dispatch(setNotificationsScrollable(true))
	})
    }
}

export function doRemoveNotification(token, removeId, checked) {
    return dispatch => {
	dispatch(setNotificationRemovePending(true))
	dispatch(setNotificationRemoveSuccess(false))
	dispatch(setNotificationRemoveError(null))
	
	callRemoveNotificationApi(token, removeId, cb => {
	    dispatch(setNotificationRemovePending(false))
	    if (cb.status === 204) {
		dispatch(removeNotification(removeId))
		dispatch(setNotificationRemoveSuccess(true))
		if (!checked)
		    dispatch(decreaseUnread())
	    } else {
		dispatch(setNotificationRemoveSuccess(false))
		dispatch(setNotificationRemoveError(cb))
	    }
	})
    }
}
