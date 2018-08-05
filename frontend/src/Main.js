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
import Photography from './Photography'
import { doRefreshToken, doSilentRefreshToken } from './redux/actions/token'

class Main extends Component {
    constructor(props) {
	super(props)
	this.state = { timer: null, counter: 0 }
	this.tick = this.tick.bind(this)
    }
    componentDidMount() {
	this.props.doRefreshToken(this.props.refreshToken)
	let newTimer = setInterval(this.tick, 10000)
	this.setState({timer: newTimer})
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
		this.props.doSilentRefreshToken(refreshToken)
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
		    <Container className="bg-color">
			<Route exact path='/' component={Home}/>
			<Route path='/logga_in' component={Login}/>
			<Route path='/notifikationer' component={User}/>
			<Route path='/logga_ut' component={Logout}/>
			<Route path='/fotografi' component={Photography}/>
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
	doRefreshToken: (token) => 
	    dispatch(doRefreshToken(token)),
	doSilentRefreshToken: (token) => 
	    dispatch(doSilentRefreshToken(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

