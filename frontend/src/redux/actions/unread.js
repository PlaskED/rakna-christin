import axios from 'axios'
import { UNREAD_PENDING, UNREAD_SUCCESS, 
	 UNREAD_ERROR, SET_UNREAD } from './types'
import { api } from '../../globals'

function setUnreadPending(unreadPending) {
    return {
	type: UNREAD_PENDING,
	unreadPending
    }
}

function setUnreadSuccess(unreadSuccess) {
    return {
	type: UNREAD_SUCCESS,
	unreadSuccess
    }
}

function setUnreadError(unreadError) {
    return {
	type: UNREAD_ERROR,
	unreadError
    }
}

export function setUnread(unread) {
    return {
	type: SET_UNREAD,
	unread
    }
}

function callGetUnreadApi(token, cb) {
    setTimeout(() => {
	axios({
	    method:'get',
	    url: api.concat('/notifications/unread'),
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

export function getUnread(token) {
    return dispatch => {
	dispatch(setUnreadPending(true))
	dispatch(setUnreadSuccess(false))
	dispatch(setUnreadError(null))
	
	callGetUnreadApi(token, cb => {
	    dispatch(setUnreadPending(false))
	    if (cb.status === 200) {
		dispatch(setUnread(cb.data.data.unread))
		dispatch(setUnreadSuccess(true))
	    } else {
		dispatch(setUnreadSuccess(false))
		dispatch(setUnreadError(cb))
	    }
	})
    }
}
