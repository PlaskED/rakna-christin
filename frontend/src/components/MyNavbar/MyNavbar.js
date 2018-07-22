import React, { Component} from 'react'
import { Navbar } from 'react-materialize'
import { NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import { Logo } from './logo_color.png'

class MyNavbar extends Component {
    getNavLinkClass = (path) => {
	return this.props.location.pathname === path ? 'active' : ''
    }
    render() {
	let { user } = this.props
	let logo = <img src={Logo} alt='Logo'/>
	return (
	<Navbar brand={logo} className='teal lighten-1' right>
	    <div>
		<li className={this.getNavLinkClass('/')}><NavLink to='/'>
		    <i className='material-icons left'>home</i>Home</NavLink></li>
		{ user && <li className={this.getNavLinkClass('/user')}><NavLink to='/user'>
		    <i className='material-icons left'>account_circle</i>User</NavLink></li> }
		    { user && <li className={this.getNavLinkClass('/logout')}><NavLink to='/logout'>
			<i className='material-icons left'>keyboard_return</i>Logout</NavLink></li> }
	    </div>
	</Navbar>
	)
    }
}

const mapStateToProps = (state) => {
    return {
	user: state.reducerLogin.user,
    }
}

export default withRouter(connect(mapStateToProps, null)(MyNavbar))
