import axios from "axios";

import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR,
	 LOGOUT_PENDING, LOGOUT_SUCCESS, LOGOUT_ERROR,
	 SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_USER } from "./types"

function setLoginPending(loginPending) {
    return {
	type: LOGIN_PENDING,
	loginPending
    };
}

function setLoginSuccess(loginSuccess) {
    return {
	type: LOGIN_SUCCESS,
	loginSuccess
    };
}

function setLoginError(loginError) {
    return {
	type: LOGIN_ERROR,
	loginError
    };
}

function setLogoutPending(logoutPending) {
    return {
	type: LOGOUT_PENDING,
	logoutPending
    };
}

function setLogoutSuccess(logoutSuccess) {
    return {
	type: LOGOUT_SUCCESS,
	logoutSuccess
    };
}

function setLogoutError(logoutError) {
    return {
	type: LOGOUT_ERROR,
	logoutError
    };
}

function setAccessToken(accessToken) {
    return {
	type: SET_ACCESS_TOKEN,
	accessToken
    }
}

function setRefreshToken(refreshToken) {
    return {
	type: SET_REFRESH_TOKEN,
	refreshToken
    }
}

function setUser(user) {
    return {
	type: SET_USER,
	user
    }
}

function callLoginApi(username, password) {
    return axios({
	method:'get',
	url: 'http://localhost:5000/api/token/get',
	data: {
	    username: username,
	    password: password,
	},
    });
}

function callLogoutAccessApi(accessToken) {
    return axios({
	method:'get',
	url: 'http://localhost:5000/api/logout/access',
	headers: {
	    Authorization: 'Bearer '.concat(accessToken)
	}
    });
}

function callLogoutRefreshApi(refreshToken) {
    return axios({
	method:'get',
	url: 'http://localhost:5000/api/logout/refresh',
	headers: {
	    Authorization: 'Bearer '.concat(refreshToken)
	}
    });
}

function callGetUserApi(accessToken) {
    return axios({
	method:'get',
	url: 'http://localhost:5000/api/user/get',
	headers: {
	    Authorization: 'Bearer '.concat(accessToken)
	}
    });
}

export function login(username, password) {
    return dispatch => {
	dispatch(setLoginPending(true));
	dispatch(setLoginSuccess(false));
	dispatch(setLoginError(null));

	axios.all([callLoginApi(username, password),
		   callGetUserApi(username, password)])
	     .then(axios.spread(function (cb_login, cb_user) {
		 dispatch(setLoginPending(false));
		 dispatch(setAccessToken(cb_login.data.data.accessToken));
		 dispatch(setRefreshToken(cb_login.data.data.refreshToken));
		 dispatch(setUser(cb_user.data.data));
		 dispatch(setLoginSuccess(true));
	     }))
	     .catch((err) => {
		 dispatch(setLoginPending(false));
		 dispatch(setLoginError(err));
		 dispatch(setAccessToken(null));
		 dispatch(setRefreshToken(null));
		 dispatch(setUser(null));
	     });
    }
}

export function logout(accessToken, refreshToken) {
    return dispatch => {
	dispatch(setLogoutPending(true));
	dispatch(setLogoutSuccess(false));
	dispatch(setLogoutError(null));

	axios.all([callLogoutAccessApi(accessToken), 
		   callLogoutRefreshApi(refreshToken)])
	     .then(axios.spread(function (cb_access, cb_refresh) {
		 dispatch(setLogoutPending(false));
		 dispatch(setLogoutSuccess(false));
		 dispatch(setLogoutError(null));
		 dispatch(setAccessToken(null));
		 dispatch(setRefreshToken(null));
		 dispatch(setUser(null));
	     }))
	.catch((err) => {
	    dispatch(setLogoutPending(false));
	    dispatch(setLogoutSuccess(false));
	    dispatch(setLogoutError(err));
	    dispatch(setAccessToken(null));
	    dispatch(setRefreshToken(null));
	    dispatch(setUser(null));
	});
    }
}

export function logoutLoginState() {
    return dispatch => {
	dispatch(setLoginPending(false));
	dispatch(setLoginSuccess(false));
	dispatch(setLoginError(null));
	dispatch(setAccessToken(null));
	dispatch(setUser(null));
    }
}
