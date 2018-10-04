import React, { Component } from 'react'
import { Row, CardPanel, Col, Button, Input } from 'react-materialize'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/sv'

import { getNotifications, doRemoveNotification } from '../../redux/actions/notifications'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

class Notifications extends Component {
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
	if (this.isBottom(wrappedElement) && this.props.notificationsScrollable) {
	    this.getNotifications()
	}
    }

    getNotifications() {
	let { accessToken, notifications } = this.props
	var lastIndex = 0
	if (notifications.length > 0)
	    lastIndex = notifications[notifications.length-1].id
	this.props.getNotifications(accessToken, lastIndex)
    }

    removeNotification(removeId) {
	this.props.doRemoveNotification(this.props.accessToken, removeId)
    }

    render() {
	let { notifications, notificationsPending, notificationsError,
	    removePending, removeError } = this.props

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
					       checked={it.checked} />
				    </Col>
				    <Col s={12}>
					<Button type='submit' waves='light'
					disabled={removePending}
					icon='delete_forever'
					onClick={(e) => {
						if (window.confirm('Vill du ta bort notifikationen?')) this.removeNotification(it.id) }
					}/>
				    </Col>
				    <Col s={12}>
					{ removePending && <Row><Loader/></Row> }
					{ removeError && <Error error={removeError}/> }
				    </Col>
				</Col>
			    </Row>
			</CardPanel>
		    </div>
		))
	    }
		{ notificationsPending && <Row><Loader/></Row> }
		{ notificationsError && <Error error={notificationsError}/> }
	    </div>
	)
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken,
	notificationsPending: state.reducerNotifications.notificationsPending,
	notificationsError: state.reducerNotifications.notificationsError, 
	notificationsScrollable: state.reducerNotifications.notificationsScrollable,
	removePending: state.reducerNotifications.notificationRemovePending,
	removeError: state.reducerNotifications.notificationRemoveError,
	notifications: state.reducerNotifications.notifications,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
	getNotifications: (token, index) => dispatch(getNotifications(token, index)),
	doRemoveNotification: (token, removeId) => dispatch(doRemoveNotification(token, removeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
