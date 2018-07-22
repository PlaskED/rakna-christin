import axios from 'axios'

import { USER_PENDING, USER_SUCCESS, USER_ERROR,
	 SET_USER } from './types'

function setUserPending(userPending) {
    return {
	type: USER_PENDING,
	userPending
    }
}

function setUserSuccess(userSuccess) {
    return {
	type: USER_SUCCESS,
	userSuccess
    }
}

function setUserError(userError) {
    return {
	type: USER_ERROR,
	userError
    }
}

export function setUser(user) {
    return {
	type: SET_USER,
	user
    }
}

function callGetUserApi(accessToken) {
    return axios({
	method:'get',
	url: 'http://localhost:5000/api/user/get',
	headers: {
	    Authorization: 'Bearer '.concat(accessToken)
	}
    })
}

export function getUser(accessToken) {
    return dispatch => {
	dispatch(setUserPending(true))
	dispatch(setUserSuccess(false))
	dispatch(setUserError(null))

	callGetUserApi(accessToken)
	    .then(function (cb) {
		dispatch(setUser(cb.data.data))
		dispatch(setUserPending(false))
		dispatch(setUserSuccess(true))
	    })
	    .catch((err) => {
		dispatch(setUserPending(false))
		dispatch(setUserSuccess(false))
		dispatch(setUserError(err))
		dispatch(setUser(null))
	    })
    }
}
