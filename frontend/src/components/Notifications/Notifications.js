import React, { Component } from 'react'
import { Row, CardPanel, Col, Button, Input } from 'react-materialize'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/sv'

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
	    notificationsScrollable: true,
	    notifications: [],
	    index: 0 
	}
    }

    componentDidMount() {
	this.getNotifications()
	document.addEventListener("scroll", this.trackScrolling)
    }
    componentWillUnmount() {
	document.removeEventListener("scroll", this.trackScrolling)
    }
    isBottom(elem) {
	if (!elem)
	    return null
	return elem.getBoundingClientRect().bottom <= window.innerHeight
    }
    trackScrolling = () => {
	const wrappedElement = document.getElementById('notifications-scrollable')
	if (this.isBottom(wrappedElement) && this.state.notificationsScrollable) {
	    this.getNotifications()
	}
    }

    getNotifications() {
	this.setState({success:false, error:null, 
		       pending: true, notificationsScrollable: false})
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
		success: true,
		error: null,
		notificationsScrollable: true,
	    })
	    if (newNotifications.length !== 0) {
		this.setState({ index: newNotifications[newNotifications.length-1].id })
	    }
	}).catch(err => { this.setState({notifcationsScrollable: true, error: err, success: false, pending:false}) })
    }

    render() {
	let { notifications, pending, error } = this.state

	return (
	    <div id="notifications-scrollable"> {
		notifications.map(it => ( 
		<div className='notification' key={it.id}>	
		    <CardPanel>
			<Row>
			    <Col s={10}>
				<span className="bold">Skickat: </span><span>{it.created.replace(/ /g, ', ')}</span><br/>
				<span className="bold">Namn: </span><span>{it.name}</span><br/>
				<span className="bold">Email: </span><span>{it.email}</span><br/>
				<span className="bold">Telefon: </span><span>{it.telephone}</span><br/>
				<span className="bold">Address: </span><span>{it.address.city}, {it.address.road}, {it.address.number}</span><br/>
				<span className="bold">Vill ha hjälp från och med: </span><span>{moment(it.when, "YYYY-MM-DD")
				    .format("YYYY-MM-DD")}</span><br/>
				<blockquote>"{it.comment}"</blockquote>
			    </Col>
			    <Col s={2} className="center">
				<Col s={12}><h5>#{it.id}</h5></Col>
				<Col s={12}>
				    <Input name='group1' type='checkbox'
					   label={it.checked ? 'Läst' : 'Ej läst'} 
					   className='filled-in' 
					   defaultChecked='unchecked' checked={it.checked} />
				</Col>
				<Col s={12}>
				    <Button type='submit' waves='light'
				    icon='delete_forever'
				    onClick={(e) => {
				    if (window.confirm('Vill du ta bort notifikationen?')) alert("removing: "+e) }
				    }/>
				</Col>
			    </Col>
			</Row>
		    </CardPanel>
		</div>
		))
	    }
		
		{ pending && <Row><Loader/></Row> }
		{ error && <Error error={error}/> }
	    </div>
	)
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken,
    }
}

export default connect(mapStateToProps, null)(Notifications)
