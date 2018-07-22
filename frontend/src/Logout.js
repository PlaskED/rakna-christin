import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from './redux/actions/login'

class Logout extends Component {
    componentWillMount() {
	let { accessToken, refreshToken } = this.props
	if (accessToken) 
	    this.props.logout(accessToken, refreshToken)
    }
    render() {
	return (
	    // TODO: wait for logout to finish then redirect
	    <Redirect to='/' />
	)
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerLogin.accessToken,
	refreshToken: state.reducerLogin.refreshToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
	logout: (accessToken, refreshToken) => 
	    dispatch(logout(accessToken, refreshToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
