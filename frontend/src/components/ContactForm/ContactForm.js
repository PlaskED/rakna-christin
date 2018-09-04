import React, { Component } from 'react'
import { Input, Row, Col, Divider, Button, Icon, Section } from 'react-materialize'
import axios from 'axios'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'moment/locale/sv'
import 'react-datepicker/dist/react-datepicker.css'

import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import { api } from '../../globals'

class ContactForm extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    contactPending: false,
	    contactSuccess: false,
	    contactError: null,
	    name: '',
	    comment: '',
	    email: '',
	    telephone: '',
	    city: '', 
	    road: '', 
	    number: '',
	}
	this.onSubmit = this.onSubmit.bind(this)
	this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(date) {
	this.setState({when: date})
    }

    resetFormState() {
	this.setState({
	    name: '',
	    comment: '',
	    email: '',
	    telephone: '',
	    city: '', 
	    road: '', 
	    number: '',
	})
    }

    // Formats address for backend
    formattedAddress() {
	let { city, road, number } = this.state
	const n = parseInt(number, 10) || null
	return { city:city, road:road, number:n }
    }

    onSubmit(e) {
	e.preventDefault()
	this.contactSubmit()
    }

    contactSubmit() {
	let { name, comment, email, telephone, when } = this.state
	this.setState({contactPending: true})
	axios({
	    method:'post',
	    url: api.concat('/notification/create'),
	    data: {
		name: name,
		comment: comment,
		email: email,
		telephone: telephone,
		address: this.formattedAddress(),
		when: when,
	    }
	}).then(response => {
	    this.setState({ 
		contactPending: false,
		contactSuccess: true,
		contactError: null,
	    })
	    this.resetFormState()
	}).catch(err => { this.setState({contactError: err, contactSuccess:false, contactPending:false}) })
    }

    render() {
	let { contactPending, contactSuccess, contactError,
	      name, comment, email, telephone, city, road, number, when } = this.state

	return (
	    <form name='contact-form' onSubmit={this.onSubmit}>
		<div className='center'>
		    <Row>
			<Col offset='s2' s={8}>
			    <h4>Kontaktformulär</h4>
			    <Divider/>
			    <Section>
				<h5>Kontaktuppgifter</h5>
				<Input s={12} label='Namn' 
				       onChange={e => this.setState({
					       name: e.target.value
				       })} value={name}>
				    <Icon>account_circle</Icon>
				</Input>
				<Input s={12} validate label='Email' 
				       type='email'
				       onChange={e => this.setState({
					       email: e.target.value
				       })} value={email}>
				    <Icon>email</Icon>
				</Input>
				<Input s={12} label='Telefon' 
				       onChange={e => this.setState({
					       telephone: e.target.value
				       })} value={telephone}>
				    <Icon>phone</Icon>
				</Input>
			    </Section>
			</Col>
		    </Row>
		    <Row>
			<Col offset='s2' s={8}>
			    <Section>
				<h5>Address</h5>
				<Input s={5} label='Stad' 
				       onChange={e => this.setState({
					       city: e.target.value
				       })} value={city}/>
				<Input s={5} label='Väg' 
				       onChange={e => this.setState({
					       road: e.target.value
				       })} value={road}/>
				<Input s={2} label='Nummer' 
				       onChange={e => this.setState({
					       number: e.target.value
				       })} value={number}/>
			    </Section>
			</Col>
		    </Row>
		    <Row>
			<Col offset='s2' s={8}>
			    <Section>
				<h5>Beskrivning</h5>
				<Input s={12} label='Jag behöver hjälp med' 
				       type='textarea'
				       onChange={e => this.setState({
					       comment: e.target.value
				       })} value={comment}/>
				<Col s={12}>
				    <span>
					Från vilket datum vill du ha hjälp?
				    </span>
				    <DatePicker
				    selected={when}
				    onChange={this.handleChange}
				    minDate={moment()}
				    locale='sv'
				    dateFormat="YYYY-MM-DD"
				    popperPlacement='top'
				    placeholderText="Välj ett datum"
				    popperModifiers={{
					flip: {
					    enabled: false
					},
					preventOverflow: {
					    enabled: true,
					    escapeWithReference: false
					}
				    }}
				    />
				</Col>
			    </Section>
			</Col>
		    </Row>
		    
		    <Row>
			<Col offset='s2' s={8}>
			    <Button type='submit' waves='light' icon='send'>Skicka</Button>
			</Col>
		    </Row>
		    <Row>{ contactPending && <Loader/> }</Row>
		    <Row>
			{ contactPending && <p className='center'>Skickar formulär, vänta..</p> }
			{ contactSuccess && <p className='center'>Vi har mottagit din intresseanmälan, tack!</p> }
			<Error error={contactError}/>
		    </Row>
		</div>
	    </form> 
	)
    }
}

export default ContactForm
