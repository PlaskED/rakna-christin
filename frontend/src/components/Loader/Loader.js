import React, { Component } from 'react'
import { Preloader } from 'react-materialize'

class Loader extends Component {
    render() {
	return (
	    <div className='center'>
		<Preloader size='big' color='green' />
	    </div>
	)
    }
}

export default Loader
