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
	let { accessToken } = this.props
	let logo = <img src={Logo} alt='Logo'/>
	return (
	<Navbar brand={logo} className='teal lighten-1' right>
	    <div>
		<li className={this.getNavLinkClass('/')}><NavLink to='/'>
		    <i className='material-icons left'>home</i>Startsida</NavLink></li>
		<li className={this.getNavLinkClass('/info')}><NavLink to='/info'>
		    Info</NavLink></li>
		<li className={this.getNavLinkClass('/priser')}><NavLink to='/priser'>
		    Priser</NavLink></li>
		<li className={this.getNavLinkClass('/kontakt')}><NavLink to='/kontakt'>
		    Kontakt</NavLink></li>
		<li className={this.getNavLinkClass('/fotografi')}><NavLink to='/fotografi'>
		    Fotografi</NavLink></li>
		{ accessToken && <li className={this.getNavLinkClass('/notifikationer')}><NavLink to='/notifikationer'>
		    <i className='material-icons left'>account_circle</i>Notifikationer</NavLink>
		</li> }
		    { accessToken && <li className={this.getNavLinkClass('/logga_ut')}><NavLink to='/logga_ut'>
			<i className='material-icons left'>keyboard_return</i>Logga ut</NavLink>
		    </li> }
	    </div>
	</Navbar>
	)
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken,
    }
}

export default withRouter(connect(mapStateToProps, null)(MyNavbar))
