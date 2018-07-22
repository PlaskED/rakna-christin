import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { Container } from 'react-materialize'
import { connect } from 'react-redux'

import MyNavbar from './components/MyNavbar/MyNavbar'
import Footer from './components/Footer/Footer'
import Home from './Home'
import Login from './Login'
import User from './User'
import Logout from './Logout'
import { refreshToken, silentRefreshToken } from './redux/actions/token'

class Main extends Component {
    constructor(props) {
	super(props)
	this.state = { timer: null,  counter: 0 }
	this.tick = this.tick.bind(this)
    }
    componentDidMount() {
	this.props.refreshToken(this.props.refreshToken)
	let timer = setInterval(this.tick, 10000)
	this.setState({timer})
    }
    componentWillUnmount() {
	clearInterval(this.state.timer)
    }
    
    tick() {
	let { refreshToken } = this.props
	let { counter } = this.state
	if(refreshToken) {
	    this.setState({ counter: counter + 1 })
	    if (counter > 87) { //Refresh token when it's close to expiry
		this.props.silentRefreshToken(refreshToken)
		this.setState({ counter: 0 })
	    }
	} else {
	    this.setState({ counter: 0 })
	}
    }
    
    render() {
	return (
	    <BrowserRouter>
		<div>
		    <MyNavbar/>
		    <Container>
			<Route exact path='/' component={Home}/>
			<Route path='/login' component={Login}/>
			<Route path='/user' component={User} />
			<Route path='/logout' component={Logout} />
		    </Container>
		    <Footer/>
		</div>
	    </BrowserRouter>
	)
    }
}

const mapStateToProps = (state) => {
    return {
	refreshToken: state.reducerToken.refreshToken,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
	refreshToken: (token) => 
	    dispatch(refreshToken(token)),
	silentRefreshToken: (token) => 
	    dispatch(silentRefreshToken(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

