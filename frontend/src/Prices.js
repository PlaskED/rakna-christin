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
		    <Col s={6} className="left">
			<h4>
			    Undervisning i Rönninge hos mig
			</h4>
			<ul class="circle">
			    <li>
				Prova-på-erbjudande! 3 h - 1 000 kr
			    </li>
			    <li>
				Undervisning för en person - 450 kr/h
			    </li>
			</ul>
			<h4>Undervisning hemma hos elev</h4>
			<ul class="circle">
			    <li>
				Undervisning för en person - 550 kr/h
				<ul>
				    <li>
					
				    </li>
				</ul>
			    </li>
			</ul>
			<p>Alla priser är inklusive moms.</p>
		    </Col>
		    <Col s={6}>
			<img className="responsive-image col s12" 
			     src={window.location.origin + '/img/priser.JPG'} 
			alt="Logo" />
		    </Col>
		</Row>
	    </div>
	)

    }
}

export default Prices;
