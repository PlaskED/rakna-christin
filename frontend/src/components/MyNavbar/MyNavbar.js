import React, { Component} from 'react'
import { Navbar, Col } from 'react-materialize'
import { NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
// eslint-disable-next-line 
import M from 'materialize-css'

class MyNavbar extends Component {
    getNavLinkClass = (path) => {
	return this.props.location.pathname === path ? 'active' : ''
    }

    render() {
	let { accessToken } = this.props
	let logo = 
	    <Col offset='s2'>
		<img className='responsive-image'
		     src={window.location.origin+'/img/logga_raknamedchristin.svg'}
		     alt='Logo'
		     width='220px' />
	    </Col>
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
    }
}

export default withRouter(connect(mapStateToProps, null)(MyNavbar))
