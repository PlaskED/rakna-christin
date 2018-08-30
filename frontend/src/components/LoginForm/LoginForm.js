import React, { Component } from 'react'
import { Input, Row, Col, Button, Divider } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../redux/actions/login'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

class LoginForm extends Component {
    constructor(props) {
	super(props)
	this.state = {username: '', password: ''}
	this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
	e.preventDefault()
	let { username, password } = this.state
	this.props.login(username, password)
	this.setState({
	    username: '',
	    password: ''
	})
    }

    render() {
	let { username, password } = this.state
	let { accessToken, loginPending, loginSuccess, loginError } = this.props

	return (
	    <form name='login-form' onSubmit={this.onSubmit}>
		<div className='center'>
		    <Row>
			<Col offset='s3' s={6}>
			    <h4>Inloggningsformulär</h4>
			    <Divider/>
			    <Input s={12} label='Användarnamn' 
				   onChange={e => this.setState({
					   username: e.target.value
				   })} value={username}/>
			    <Input s={12} label='Lösenord' type='password' 
				   onChange={e => this.setState({
					   password: e.target.value
				   })} value={password}/>
			</Col>
		    </Row>
		    
		    <Row>
			<Button type='submit' waves='light' icon='send'>Logga in</Button>
		    </Row>
		    <Row>{ loginPending && <Loader/> }</Row>
		    <Row>
			{ loginPending && <p className='center'>Loggar in dig...</p> }
			{ loginSuccess && <p className='center'>Klart!
			    <Redirect to='/notifikationer'/></p> }
			{ accessToken && <p className='center'>Omdirigerar...
			    <Redirect to='/notifikationer'/></p> }
			<Error error={loginError}/>
		    </Row>
		</div>
	    </form>	    
	)
    }
}

const mapStateToProps = (state) => {
    return {
	loginPending: state.reducerLogin.loginPending,
	loginSuccess: state.reducerLogin.loginSuccess,
	loginError: state.reducerLogin.loginError,
	accessToken: state.reducerToken.accessToken,
	refreshToken: state.reducerToken.refreshToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
	login: (username, password) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
