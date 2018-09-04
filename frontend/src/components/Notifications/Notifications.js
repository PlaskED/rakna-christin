import React, { Component } from 'react'
import { Row, CardPanel } from 'react-materialize'
import { connect } from 'react-redux'
import axios from 'axios'

import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import { api } from '../../globals'

class Notifications extends Component {
    constructor(props) {
	super(props)
	this.state = { 
	    pending: false, 
	    error: null, 
	    success: false, 
	    notifications: [], 
	    index: 0 
	}
    }

    componentDidMount() {
	this.setState({pending: true})
	axios({
	    method:'get',
	    url: api + '/notifications/' + this.state.index,
	    headers: {
		Authorization: 'Bearer '.concat(this.props.accessToken)
	    }
	}).then(response => {
	    const newNotifications = response.data.data
	    this.setState({ 
		notifications: this.state.notifications.concat(newNotifications),
		pending: false,
		success: true 
	    })
	    if (newNotifications.length !== 0) {
		this.setState({ index: newNotifications[newNotifications.length-1].id })
	    }
	}).catch(err => { this.setState({error: err}) })
    }

    //id':self.id, 'checked':self.checked, 
    //'name':self.name, 'comment':self.comment,
    //'email':self.email, 'telephone':self.telephone,
    //'when':self.when, 'address':self.get_address(),
    //'created':self.created.strftime('%Y-%m-%d %H:%M:%S')}

    render() {
	let { notifications, pending, error, success } = this.state
	if (pending) {
	    return <Row><Loader/></Row>
	}
	if (error) {
	    return <Error error={error}/>
	}
	if (success) {
	    return (
		<div> {
		    notifications.map(it => ( 
			<div className='notification' key={it.id}>	
			    <CardPanel>
				<p>Sent {it.created}, {it.checked}</p>
				<p>{it.name}</p>
				<p>{it.email}</p>
				<p>{it.telephone}</p>
				<p>{it.address}</p>
				<p>{it.when}</p>
				<p>{it.comment}</p>
			    </CardPanel>
			</div>
		    ))
		} </div>
	    )
	} else { return null }
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken,
    }
}

export default connect(mapStateToProps, null)(Notifications)
