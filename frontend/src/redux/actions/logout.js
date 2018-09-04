import axios from 'axios'
import { LOGOUT_PENDING, LOGOUT_SUCCESS, LOGOUT_ERROR } from './types'
import { resetTokenState } from './token'
import { setUser } from './user'
import { resetLoginState } from './login'
import { api } from '../../globals'

function setLogoutPending(logoutPending) {
    return {
	type: LOGOUT_PENDING,
	logoutPending
    }
}

function setLogoutError(logoutError) {
    return {
	type: LOGOUT_ERROR,
	logoutError
    }
}

function setLogoutSuccess(logoutSuccess) {
    return {
	type: LOGOUT_SUCCESS,
	logoutSuccess
    }
}

function callLogoutAccessApi(accessToken) {
    return axios({
	method:'get',
	url: api.concat('/logout/access'),
	headers: {
	    Authorization: 'Bearer '.concat(accessToken)
	}
    })
}

function callLogoutRefreshApi(refreshToken) {
    return axios({
	method:'get',
	url: api.concat('/logout/refresh'),
	headers: {
	    Authorization: 'Bearer '.concat(refreshToken)
	}
    })
}

export function logout(accessToken, refreshToken) {
    return dispatch => {
	dispatch(setLogoutPending(true))
	dispatch(setLogoutSuccess(false))
	dispatch(setLogoutError(null))

	axios.all([callLogoutAccessApi(accessToken), 
		   callLogoutRefreshApi(refreshToken)])
	     .then(axios.spread(function (cb_access, cb_refresh) {
		 dispatch(setLogoutPending(false))
		 dispatch(setLogoutSuccess(true))
		 dispatch(setLogoutError(null))
		 dispatch(resetLoginState())
		 dispatch(resetTokenState())
		 dispatch(setUser(null))
	     }))
	     .catch((err) => {
		 dispatch(setLogoutPending(false))
		 dispatch(setLogoutSuccess(true))
		 dispatch(setLogoutError(err))
		 dispatch(resetLoginState())
		 dispatch(resetTokenState())
		 dispatch(setUser(null))
	     })
    }
}

export function resetLogoutState() {
    return dispatch => {
	dispatch(setLogoutPending(false))
	dispatch(setLogoutSuccess(false))
	dispatch(setLogoutError(null))
    }
}



