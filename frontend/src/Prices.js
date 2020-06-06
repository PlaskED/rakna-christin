import React, { Component } from "react";
import { Col, Row, Divider } from 'react-materialize'

class Prices extends Component {
    render() {
	return (
	    <div>
		<Row className="center">
		    <h2>Priser</h2>
		    <Divider/>
		</Row>
		<Row>
		    <Col s={12} m={6} className="right">
			<img className="responsive-image col s12" 
			     src={window.location.origin + '/img/priser.JPG'} 
			alt="Logo" />
		    </Col>
		    <Col s={12} m={6}>
			<h4>Undervisning i Stockholm City</h4>
			<ul className="circle">
			    <li>Undervisning en elev, hos mig - 500 kr/h</li>
			    <li>Undervisning en elev, hos elev - 600 kr/h</li>
			</ul>
			<h4>Undervisning i Rönninge</h4>
			<ul className="circle">
			    <li>Undervisning en elev, hos elev (minst 1.5 timme) - 600 kr/h</li>
			</ul>
	    		<h4>Undervisning med Videosamtal</h4>
			<ul className="circle">
			    <li>Undervisning en elev - 500 kr/h</li>
			</ul>
	    		<h4>Vid undervisning av två elever</h4>
			<ul className="circle">
			    <li>50% rabatt för elev 2</li>
			</ul>
	    		<Divider/>
			<p>Alla priser är inklusive moms.</p>
		    </Col>
		</Row>
	    </div>
	)

    }
}

export default Prices;
