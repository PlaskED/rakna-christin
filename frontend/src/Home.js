import React, { Component } from "react";
import { Row, Col, CardPanel } from 'react-materialize'

class Home extends Component {
    render() {
	return (
	    <div className="center">
		<Row>
		</Row>
		<Row>
		    <Col s={4}>
			<CardPanel>
			    <img className="circle responsive-image col s12" 
				 src={window.location.origin + '/img/start1.JPG'} 
				 alt="start" />
			    <p className="flow-text">Tänk att matematik kan vara roligt och intressant.</p>
			    <p>När du förstår vill du bara lära dig ännu mer.</p>
			</CardPanel>
		    </Col>
		    <Col s={4}>
			<CardPanel>
			    <img className="circle responsive-image col s12" 
				 src={window.location.origin + '/img/start2.JPG'} 
				 alt="start" />
			    <p className="flow-text">Bli bättre på att använda miniräknaren.</p>
			    <p>Att kunna använda sina grundkunskaper vid problemlösning
				krävs idag i grundskola och gymnasium.</p>
			</CardPanel>
		    </Col>
		    <Col s={4}>
			<CardPanel>
			    <img className="circle responsive-image col s12" 
				 src={window.location.origin + '/img/start3.JPG'} 
				 alt="start" />
			    <p className="flow-text">Förstå och använda formler.</p>
			    <p>Formler kan vara roligt och spännande om man förstår och kan använda dem.</p>
			</CardPanel>
		    </Col>
		</Row>
	    </div>
	)

    }
}

export default Home;
