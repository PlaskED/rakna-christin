import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from './redux/actions/logout'

class Logout extends Component {
    componentWillMount() {
	let { accessToken, refreshToken } = this.props
	if (accessToken) 
	    this.props.logout(accessToken, refreshToken)
    }
    render() {
	return (
	    <Redirect to='/' />
	)
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken,
	refreshToken: state.reducerToken.refreshToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
	logout: (accessToken, refreshToken) => 
	    dispatch(logout(accessToken, refreshToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
