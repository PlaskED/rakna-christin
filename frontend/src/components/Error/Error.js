import React, { Component } from 'react'
import { Icon } from 'react-materialize'

class Error extends Component {
    render() {
	let { error } = this.props
	if (error) {
	    return (<p className='text-error center'>
		{error.message}<Icon>error</Icon></p>
	    )} 
	else { return null }
    }
}

export default Error
