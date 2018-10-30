import React, { Component } from 'react'
import { Row, CardPanel, Col, Button, Input } from 'react-materialize'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/sv'

import { getNotifications, doRemoveNotification } from '../../redux/actions/notifications'
import { doChangeUnread } from '../../redux/actions/unread'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

class Notifications extends Component {
    constructor(props) {
	super(props)
	this.state = { removeId: null }
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
	this.setState({removeId: removeId})
	this.props.doRemoveNotification(this.props.accessToken, removeId)
    }

    changeUnread(nid, checked) {
	let { changeUnreadPending, accessToken } = this.props
	alert(nid)
	alert(checked)
	if (!changeUnreadPending)
	    this.props.doChangeUnread(accessToken, nid, checked)
    }

    render() {
	let { notifications, notificationsPending, notificationsError,
	      removePending, removeError } = this.props
	let { removeId } = this.state

	return (
	    <div id="notifications-scrollable"> {
		notifications.map(it => ( 
		    <div className='notification' key={it.id}>	
			<CardPanel>
			    <Row>
				<Col s={2} m={4}><h5 className="left">#{it.id}</h5></Col>
				<Col s={4} m={4}>
				    <Input name='group1' type='checkbox'
					   label={it.checked ? 'Läst' : 'Ej läst'} 
					   className='filled-in' 
					   checked={it.checked}
					   onClick={(e) => { this.props.doChangeUnread(it.id, e.target)}}/>
				</Col>
				<Col s={6} m={4}>
				    <Button className="right"
					    waves='light'
					    disabled={removePending}
					    icon='delete_forever'
					    onClick={(e) => {
						    if (window.confirm('Vill du ta bort notifikationen?')) this.removeNotification(it.id) }
					    }>
					Ta Bort
				    </Button>
				</Col>
			    </Row>
			    <Row>
				<Col s={12} m={12}>
				    <span className="bold">Skickat: </span><span>{it.created.replace(/ /g, ', ')}</span><br/>
				    <span className="bold">Namn: </span><span>{it.name}</span><br/>
				    <span className="bold">Email: </span><span>{it.email}</span><br/>
				    <span className="bold">Telefon: </span><span>{it.telephone}</span><br/>
				    <span className="bold">Address: </span><span>{it.address.city}, {it.address.road}, {it.address.number}</span><br/>
				    <span className="bold">Vill ha hjälp från och med: </span><span>{moment(it.when, "YYYY-MM-DD")
					.format("YYYY-MM-DD")}</span><br/>
				</Col>
				<Col s={12} m={12} className="center">

				    <Col s={12}>
					{ (removePending && it.id===removeId) && <Row><Loader/></Row> }
					{ removeError && <Error error={removeError}/> }
				    </Col>
				</Col>
			    </Row>
			    <Row>
				<blockquote>"{it.comment}"</blockquote>
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
	changeUnreadPending: state.reducerUnread.changeUnreadPending,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
	getNotifications: (token, index) => dispatch(getNotifications(token, index)),
	doRemoveNotification: (token, removeId) => dispatch(doRemoveNotification(token, removeId)),
	doChangeUnread: (token, nid, checked) => 
	    dispatch(doChangeUnread(token, nid, checked))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
