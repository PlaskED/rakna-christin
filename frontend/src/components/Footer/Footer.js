import React from 'react'
import { Footer } from 'react-materialize'
import { NavLink } from 'react-router-dom'

export default () => (
    <Footer copyrights='©2018 Räkna med Christin'
	    moreLinks={
		<NavLink to='/login'>
		    <p className='white-text text-lighten-4 right'>Github</p>
		</NavLink>
	    }
	    links={
		<ul>
		    <li><NavLink to='/logga_in'>
			<p className='white-text text-lighten-4'>Admin Login</p>
		    </NavLink></li>
		</ul>
	    }
    >
	<h5 className='white-text'>Additional Information</h5>
	<p className='white-text text-lighten-4'>
	    You can use rows and columns here to organize your footer content.
	</p>
    </Footer>
)
