import React, { Component } from 'react'
import { Row, CardPanel, Divider } from 'react-materialize'
import { connect } from 'react-redux'

import Loader from '../Loader/Loader'
import { getUser } from '../../redux/actions/user'

class UserInfo extends Component {
    componentDidMount() {
	let { accessToken } = this.props
	if (accessToken)
	    this.props.getUser(accessToken)
    }

    render() {
	let { user, userPending, userSuccess, userError } = this.props
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
	if (userSuccess && user) {
	    return (
		<CardPanel>
		    <h4 className='username'>{user.username}</h4> 
		    <Divider/>
		    <p>Notifikationer skickas till: {user.email}</p>
		</CardPanel>
	    )
	} else { return null }
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken,
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
