import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Card, CardPanel, CardTitle, Chip, Row, Col } from 'react-materialize'
import Loader from '../Loader/Loader'
import { connect } from 'react-redux'
import { getUser } from '../../redux/actions/user'

class UserInfo extends Component {
    componentDidMount() {
	let { accessToken } = this.props
	this.props.getUser(accessToken)
    }

    render() {
	let { userPending, userSuccess, userError } = this.props
	if (userPending) {
	    return (
		<Row><Loader/></Row>
	    )
	}
	if (userError) {
	    return (
		<p className='text-error center'>{userError.message}</p>
	    )
	}
	if (userSuccess) {
	    return (
		<div>
		    
		</div>
	    )
	} else { return null }
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerLogin.accessToken,
	userPending: state.reducerUser.userPending,
	userError: state.reducerUser.userError,
	userSuccess: state.reducerUser.userSuccess,
	user: state.reducerUser.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
	getUser: (token) =>
	    dispatch(getUser(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
