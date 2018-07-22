import axios from 'axios'
import { TOKEN_REFRESH_PENDING, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR, 
	 SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from './types'
import { resetLoginState } from './login'

function setTokenRefreshPending(tokenRefreshPending) {
    return {
	type: TOKEN_REFRESH_PENDING,
	tokenRefreshPending
    }
}

function setTokenRefreshSuccess(tokenRefreshSuccess) {
    return {
	type: TOKEN_REFRESH_SUCCESS,
	tokenRefreshSuccess
    }
}

function setTokenRefreshError(tokenRefreshError) {
    return {
	type: TOKEN_REFRESH_ERROR,
	tokenRefreshError
    }
}

export function setAccessToken(accessToken) {
    return {
	type: SET_ACCESS_TOKEN,
	accessToken
    }
}

export function setRefreshToken(refreshToken) {
    return {
	type: SET_REFRESH_TOKEN,
	refreshToken
    }
}

function callRefreshTokenApi(refreshToken, cb) {
    setTimeout(() => {
	axios({
	    method:'post',
	    url: 'http://localhost:5000/api/token/refresh',
	    headers: {
		Authorization: 'Bearer '.concat(refreshToken)
	    }
	}).then(function(response) {
	    return cb(response)
	}).catch(function(err) {
	    return cb(err)
	})
    }, 3000)
}

export function silentRefreshToken(refreshToken) {
    return dispatch => {
	callRefreshTokenApi(refreshToken, cb => {  
	    if (cb.status === 200) {
		dispatch(setAccessToken(cb.data.data.accessToken))
	    }
	})
    }
}

export function refreshToken(refreshToken) {
    return dispatch => {
	dispatch(setTokenRefreshPending(true))
	dispatch(setTokenRefreshSuccess(false))
	dispatch(setTokenRefreshError(null))
	
	callRefreshTokenApi(refreshToken, cb => {
	    dispatch(setTokenRefreshPending(false))
	    if (cb.status === 200) {
		dispatch(setAccessToken(cb.data.data.accessToken))
		dispatch(setTokenRefreshSuccess(true))
	    } else {
		dispatch(resetLoginState())
		dispatch(setTokenRefreshError(cb))
	    }
	})
    }
}

export function resetTokenState() {
    return dispatch => {
	dispatch(setAccessToken(null))
	dispatch(setRefreshToken(null))
    }
}
