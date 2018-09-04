import axios from 'axios'
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from './types'
import { setUser } from './user'
import { setAccessToken, setRefreshToken, resetTokenState } from './token'
import { api } from '../../globals'

function setLoginPending(loginPending) {
    return {
	type: LOGIN_PENDING,
	loginPending
    }
}

function setLoginSuccess(loginSuccess) {
    return {
	type: LOGIN_SUCCESS,
	loginSuccess
    }
}

function setLoginError(loginError) {
    return {
	type: LOGIN_ERROR,
	loginError
    }
}

function callLoginApi(username, password) {
    return axios({
	method:'post',
	url: api.concat('/login'),
	data: {
	    username: username,
	    password: password,
	},
    })
}

export function login(username, password) {
    return dispatch => {
	dispatch(setLoginPending(true))
	dispatch(setLoginSuccess(false))
	dispatch(setLoginError(null))

	callLoginApi(username, password)
	    .then(function (cb) {
		dispatch(setAccessToken(cb.data.data.accessToken))
		dispatch(setRefreshToken(cb.data.data.refreshToken))
		dispatch(setLoginPending(false))
		dispatch(setLoginSuccess(true))
	    })
	    .catch((err) => {
		dispatch(setLoginPending(false))
		dispatch(setLoginError(err))
		dispatch(resetTokenState())
	    })
    }
}

export function resetLoginState() {
    return dispatch => {
	dispatch(setLoginPending(false))
	dispatch(setLoginSuccess(false))
	dispatch(setLoginError(null))
	dispatch(setUser(null))
    }
}
