import React, { Component} from 'react'
import { Navbar, Col } from 'react-materialize'
import { NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import NotificationBadge, { Effect } from 'react-notification-badge'
// eslint-disable-next-line 
import M from 'materialize-css'

import { getUnread } from '../../redux/actions/unread'

class MyNavbar extends Component {
    constructor(props) {
	super(props)
	this.state = { timer: null, counter: 0, prevUnread: null }
	this.tick = this.tick.bind(this)
    }
    componentDidMount() {
	if (this.props.accessToken)
	    this.props.getUnread(this.props.accessToken)
	let newTimer = setInterval(this.tick, 20000)
	this.setState({timer: newTimer})
    }
    componentWillUnmount() {
	clearInterval(this.state.timer)
    }
    tick() {
	let { accessToken, unread } = this.props
	let { counter, prevUnread } = this.state
	var newUnread = unread ? unread : prevUnread
	if(accessToken) {
	    this.setState({ counter: counter + 1 })
	    if (counter >= 6) {
		if (accessToken)
		    this.props.getUnread(accessToken)
		this.setState({ prevUnread: newUnread, counter: 0 })
	    }
	} else {
	    this.setState({ counter: 0 })
	}
    }
    getNavLinkClass = (path) => {
	return this.props.location.pathname === path ? 'active' : ''
    }

    render() {
	let { accessToken, unread } = this.props
	let { prevUnread } = this.state
	let logo = 
	    <Col offset='s2'>
		<img className='responsive-image'
		     src={window.location.origin+'/img/logga_raknamedchristin.svg'}
		     alt='Logo'
		     width='220px' />
	    </Col>;
	if (prevUnread && prevUnread < unread) {
	    alert("Du har fått en ny notifikation!")
	    this.setState({prevUnread: unread})
	}
	return (
	    <Navbar brand={logo} right >
		<div>
		    <li className={this.getNavLinkClass('/')}><NavLink to='/'>
			<i className='material-icons icon-main left'>home</i>Startsida</NavLink></li>
		    <li className={this.getNavLinkClass('/info')}><NavLink to='/info'>
			<i className='material-icons icon-main left'>info</i>Info</NavLink></li>
		    <li className={this.getNavLinkClass('/priser')}><NavLink to='/priser'>
			<i className='material-icons icon-main left'>local_offer</i>Priser</NavLink></li>
		    <li className={this.getNavLinkClass('/kontakt')}><NavLink to='/kontakt'>
			<i className='material-icons icon-main left'>mail</i>Kontakt</NavLink></li>
		    <li className={this.getNavLinkClass('/fotografi')}><NavLink to='/fotografi'>
			<i className='material-icons icon-main left'>camera_alt</i>Fotografi</NavLink></li>
		    { accessToken && <li className={this.getNavLinkClass('/notifikationer')}><NavLink to='/notifikationer'>
			<i className='material-icons icon-main left'>account_circle</i>Notifikationer</NavLink>
		    </li> }
			{ accessToken && <li><NotificationBadge count={unread} effect={Effect.SCALE}/></li>}
			{ accessToken && <li className={this.getNavLinkClass('/logga_ut')}><NavLink to='/logga_ut'>
			    <i className='material-icons icon-main left'>keyboard_return</i>Logga ut</NavLink>
			</li> }
		</div>
		<NavLink className="button-collapse" to='#' data-activates="nav-mobile">
		    <i className="material-icons">view_headline</i>
		</NavLink>
	    </Navbar>
	    )
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken,
	unread: state.reducerUnread.unread,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
	getUnread: (token) =>
	    dispatch(getUnread(token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyNavbar))
