import React, { Component } from 'react'
import { Icon } from 'react-materialize'

class ErrorInput extends Component {
    render() {
	let { touched, error } = this.props
	if (touched && error) {
	    return (<p className='text-error center'>
		{error}<Icon>error</Icon></p>
	    )} 
	else { return null }
    }
}

export default ErrorInput
