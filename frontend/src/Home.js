import React, { Component } from "react";
import { Row, Col, CardPanel, Carousel, Button } from 'react-materialize'
// eslint-disable-next-line 
import M from 'materialize-css'
let $ = require('jquery');

class Home extends Component {
    componentDidMount() {
	var carousel_interval = 5000
	setInterval(function() {
	    $('.carousel').carousel('next');
	}, carousel_interval)

    }

    render() {
	return (
	    <div className="center">
		<Row>
		    <Carousel options={{ fullWidth: true }}>
			<div className='red'>
			    <h2>First Panel</h2>
			    <p className='white-text'>This is your first panel</p>
			    <Button type='submit' waves='light'>Mer info</Button>
			</div>
			<div className='amber'>
			    <h2>Second Panel</h2>
			    <p className='white-text'>This is your second panel</p>
			</div>
			<div className='green'>
			    <h2>Third Panel</h2>
			    <p className='white-text'>This is your third panel</p>
			</div>
			<div className='blue'>
			    <h2>Fourth Panel</h2>
			    <p className='white-text'>This is your fourth panel</p>
			</div>
		    </Carousel>
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
