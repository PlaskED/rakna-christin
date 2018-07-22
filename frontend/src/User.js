import React, { Component } from 'react'
import { Row, Icon } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import UserInfo from './components/UserInfo/UserInfo'
import Notifications from './components/Notifications/Notifications'

class User extends Component {
    render() {
	let { accessToken } = this.props

	if (accessToken) {
	    return (
		<div>
		    <Row className='center'>
			<UserInfo/>
		    </Row>
		    <Row>
			<h4>Notifikationer<Icon>message</Icon></h4>
			<Notifications/>
		    </Row>
		</div>
	    )
	} else { return <Redirect to='/login'/> }
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken
    }
}

export default connect(mapStateToProps, null)(User)
