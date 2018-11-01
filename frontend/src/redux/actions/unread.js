import axios from 'axios'
import { UNREAD_PENDING, UNREAD_SUCCESS, 
	 UNREAD_ERROR, SET_UNREAD, 
	 CHANGE_UNREAD_PENDING, CHANGE_UNREAD_SUCCESS, 
	 CHANGE_UNREAD_ERROR } from './types'
import { changeUnread } from './notifications'
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

function setChangeUnreadPending(changeUnreadPending) {
    return {
	type: CHANGE_UNREAD_PENDING,
	changeUnreadPending
    }
}

function setChangeUnreadSuccess(changeUnreadSuccess) {
    return {
	type: CHANGE_UNREAD_SUCCESS,
	changeUnreadSuccess
    }
}

function setChangeUnreadError(changeUnreadError) {
    return {
	type: CHANGE_UNREAD_ERROR,
	changeUnreadError
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

function callChangeUnreadApi(token, nid, checked, cb) {
    setTimeout(() => {
	axios({
	    method:'post',
	    url: api.concat('/notifications/unread/change'),
	    headers: {
		Authorization: 'Bearer '.concat(token)
	    },
	    data: {
		nid: nid,
		checked: checked,
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

export function doChangeUnread(token, nid, checked) {
    return dispatch => {
	dispatch(setChangeUnreadPending(true))
	dispatch(setChangeUnreadSuccess(false))
	dispatch(setChangeUnreadError(null))
	
	callChangeUnreadApi(token, nid, checked, cb => {
	    dispatch(setChangeUnreadPending(false))
	    if (cb.status === 200) {
		dispatch(changeUnread(cb.data.data))
		dispatch(setChangeUnreadSuccess(true))
	    } else {
		dispatch(setChangeUnreadSuccess(false))
		dispatch(setChangeUnreadError(cb))
	    }
	})
    }
}
