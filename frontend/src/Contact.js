import React, { Component } from "react";
import { Col, Row, Divider } from 'react-materialize'

import ContactForm from './components/ContactForm/ContactForm'

class Contact extends Component {
    render() {
	return (
	    <div>
		<Row className="center">
		    <h2>Kontakt</h2>
		    <Divider/>
		</Row>
		<Row>
		    <Col s={12} m={6} className="right">
			<img className="responsive-image col s12" 
			     src={window.location.origin + '/img/kontakt.JPG'} 
			alt="Contact" />
		    </Col>
		    <Col s={12} m={6}>
			<div className="col-md-7">
			    <h4>Christin Holm</h4>
			    <b>Mail: </b> 
			    <a href="mailto:holmchristin@gmail.com?Subject=Räkna%20med%20christin:%20" target="_top">
				holmchristin@gmail.com
			    </a>
			    <br/>
			    <b>Telefon: </b> 070-73 11 954 
			    <br/>
			    <a href="https://www.facebook.com/raknamedchristin/">Facebook</a>      
			    
			    <blockquote>
				<b>Betalning: </b>Danske Bank 1374-0285702<br/>
				<b>Företaget: </b>Godkänd för F-skatt och har momsregistreringsnummer SE610831102501<br/>
				Innehar F-skattebevis
			    </blockquote>
			</div>
		    </Col>
		</Row>
		<Row>
		    <ContactForm/>
		</Row>
	    </div>
	)

    }
}

export default Contact
