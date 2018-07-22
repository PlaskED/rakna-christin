import React, { Component } from 'react'
import { Row, Col, Icon } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import UserInfo from './components/UserInfo/UserInfo'

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
			<Col s={6} className='center'>
			    <h4>Notifcations<Icon>message</Icon></h4>
			</Col>
		    </Row>
		</div>
	    )
	} else { return <Redirect to='/login'/> }
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerLogin.accessToken
    }
}

export default connect(mapStateToProps, null)(User)
