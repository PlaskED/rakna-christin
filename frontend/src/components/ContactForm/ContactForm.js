import React, { Component } from 'react'
import { Input, Row, Col, Divider, Button, Section } from 'react-materialize'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'moment/locale/sv'
import 'react-datepicker/dist/react-datepicker.css'
import { Formik } from 'formik'
import Recaptcha from 'react-recaptcha'

import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import ErrorInput from '../Error/ErrorInput'
import { api, publicKey } from '../../globals'

class ContactForm extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    contactPending: false,
	    contactSuccess: false,
	    contactError: null,
	    when: null
	}
	this.handleDateChange = this.handleDateChange.bind(this)
    }

    componentDidMount() {
	const script = document.createElement("script");
	script.src =
	    "https://www.google.com/recaptcha/api.js";
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);
    }

    handleDateChange(date) {
	this.setState({when: date})
    }

    // Formats address for backend
    formattedAddress(city, road, number) {
	const n = parseInt(number, 10) || null
	return { city:city, road:road, number:n }
    }

    contactSubmit(values) {
	let { name, comment, email, telephone, city, road, number, recaptcha } = values
	this.setState({contactPending: true})
	axios({
	    method:'post',
	    url: api.concat('/notification/create'),
	    data: {
		name: name,
		comment: comment,
		email: email,
		telephone: telephone,
		address: this.formattedAddress(city, road, number),
		when: this.state.when,
		recaptcha: recaptcha
	    }
	}).then(response => {
	    this.setState({ 
		contactPending: false,
		contactSuccess: true,
		contactError: null,
	    })
	}).catch(err => { this.setState({contactError: err, contactSuccess:false, contactPending:false}) })
    }

    render() {
	let { contactPending, contactSuccess, contactError } = this.state
	const buttonEnable = contactPending !== true
	
	return (
	    <div>
		{
		    <Formik
		    initialValues={{
			name: '',
			comment: '',
			email: '',
			telephone: '',
			city: '', 
			road: '', 
			number: '',
			when: '',
			recaptcha: '',
		    }}
		    validate={values => {
			    let errors = {};
			    if (!values.name) {
				errors.name = 'Obligatoriskt fält';
			    } else if (values.name.length < 2 || values.name.length > 64) {
				errors.name = 'Namn måste vara mellan 2 och 64 tecken'
			    }
			    if (!values.email) {
				errors.email = 'Obligatoriskt fält';
			    } else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
			    ) {
				errors.email = 'Ej giltig email';
			    }
			    if (!values.telephone) {
				errors.telephone = 'Obligatoriskt fält';
			    } else if (
				!/^(\+)?([0-9\s]{1,4})+$/i.test(values.telephone)
			    ) {
				errors.telephone = 'Ange i något av följande format: +12 345 678 912 eller 1234 567 891 eller 1234567891';
			    }
			    if (!values.city) {
				errors.city = 'Obligatoriskt fält';
			    } else if (values.city.length < 2 || values.city.length > 64) {
				errors.city = 'Stadnamn måste vara mellan 2 och 64 tecken';
			    }
			    if ( values.road && values.road.length !== 0 &&
				 (values.road.length < 2 || values.road.length > 64)
			    ) {
				errors.road = 'Vägnamn måste vara mellan 2 och 64 tecken';
			    }
			    if ( values.number &&
				 (values.number.length < 0 || values.number.length > 10)
			    ) {
				errors.number = 'Vägnummer måste vara 1 till 10 tecken';
			    }
			    if (!values.comment) {
				errors.comment = 'Obligatoriskt fält';
			    } else if (values.comment.length < 10 || values.comment.length > 2048) {
				errors.comment = 'Beskrivning måste vara mellan 10 och 2048 tecken';
			    }
			    if (!this.state.when) {
				errors.when = 'Obligatoriskt fält';
			    } else if (!errors.when instanceof Date) {
				errors.when = 'Välj ett korrekt datum (YYYY-MM-DD)';
			    }
			    if (!values.recaptcha) {
				errors.recaptcha = 'Verifiera att du är en människa';
			    }
			    return errors;
		    }}
			onSubmit={(values) => {
				this.contactSubmit(values)
			}}
			render={({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				setFieldValue
			}) => (
			    <form onSubmit={handleSubmit}>
				<div className='center'>
				    <Row>
					<Col offset='s2' s={8}>
					    <h4>Kontaktformulär</h4>
					    <Divider/>
					    <Section>
						<h5>Kontaktuppgifter</h5>
						<Input s={12} name='name' 
						       icon='account_circle' data-length='64'
						       onChange={handleChange}
						       onBlur={handleBlur}
						       value={values.name}
						       label='Namn'
						/> <ErrorInput touched={touched.name} error={errors.name}/>
						<Input s={12} name="email"
						       icon='email' data-length='64'
						       onChange={handleChange}
						       onBlur={handleBlur}
						       value={values.email}
						       label='Email'
						/> <ErrorInput touched={touched.email} error={errors.email}/>
						<Input s={12} name="telephone"
						       icon='phone' data-length='20'
						       onChange={handleChange}
						       onBlur={handleBlur}
						       value={values.telephone}
						       label='Telefon'
						/> <ErrorInput touched={touched.telephone} error={errors.telephone}/>
					    </Section>
					</Col>
				    </Row>
				    <Row>
					<Col offset='s2' s={8}>
					    <Section>
						<Input s={5} name='city'
						       data-length='64'
						       onChange={handleChange}
						       onBlur={handleBlur}
						       value={values.city}
						       label='Stad' 
						/>    
						<Input s={5} name='road'
						       data-length='64'
						       onChange={handleChange}
						       onBlur={handleBlur}
						       value={values.road}
						       label='Väg' 
						/>
						<Input s={2} name='number'
						       data-length='10'
						       onChange={handleChange}
						       onBlur={handleBlur}
						       value={values.number}
						       label='Nummer'
						/>
						<Col s={5}><ErrorInput touched={touched.city} error={errors.city}/></Col>
						<Col s={5}><ErrorInput touched={touched.road} error={errors.road}/></Col>
						<Col s={2}><ErrorInput touched={touched.number} error={errors.number}/></Col>
					    </Section>
					</Col>
				    </Row>
				    <Row>
					<Col offset='s2' s={8}>
					    <Section>
						<h5>Beskrivning</h5>
						<Input s={12} name='comment'
						       data-length='2048'
						       onChange={handleChange}
						       onBlur={handleBlur}
						       value={values.comment}
						       label='Jag behöver hjälp med'
						       type='textarea'
						/>
						<ErrorInput touched={touched.comment} error={errors.comment}/>
						<Col s={6}>
						    <span>
							Från vilket datum vill du ha hjälp?
						    </span>
						    <DatePicker name='when'
								selected={this.state.when}
								onChange={this.handleDateChange}
								onBlur={handleBlur}
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
						<Col s={6}>
						    <Recaptcha
							name='recaptcha'
							sitekey={publicKey}
							render="explicit"
							theme="light"
							verifyCallback={(response) => { setFieldValue("recaptcha", response); }}
							onloadCallback={() => {}}
						    />
						</Col>
						<Col s={6}><ErrorInput touched={touched.when} error={errors.when}/></Col>
						<Col s={6}><ErrorInput touched={touched.recaptcha} error={errors.recaptcha}/></Col>
					    </Section>
					</Col>
				    </Row>
				    <Row>
					<Col offset='s2' s={8}>
					    <Button type='submit' waves='light'
						    icon='send' 
						    disabled={!buttonEnable}>Skicka
					    </Button>
					</Col>
				    </Row>
				    <Row>{ contactPending && <Loader/> }</Row>
				    <Row>
					{ contactPending && <p className='center'>Skickar intresseanmälan, vänta..</p> }
					{ contactSuccess && <p className='center'>Vi har mottagit din intresseanmälan, tack!</p> }
					<Error error={contactError}/>
				    </Row>
				</div>
			    </form>
			)}
		    />}
	    </div>
	)
    }
}

export default ContactForm
