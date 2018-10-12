import React, { Component } from "react";
import { Row, Col, CardPanel, Carousel, Button } from 'react-materialize'
// eslint-disable-next-line 
import M from 'materialize-css'
import FaceBook from './components/FaceBook/FaceBook'

let $ = require('jquery');

class Home extends Component {
    
    componentDidMount() {
	var carousel_interval = 5000
	setInterval(function() {
	    $('.carousel').carousel('next');
	}, carousel_interval);
	const FB = window.FB;
	if (FB)
	    FB.XFBML.parse();
    }

    render() {
	return (
	    <div className="center">
		<Row/>
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
			    <h4>Kolla in oss på facebook!</h4>
			    <FaceBook/>
			</CardPanel>
		    </Col>
		    <Col s={4}>
			<CardPanel>
			    <img className="circle responsive-image col s12" 
				 src={window.location.origin + '/img/start2.JPG'} 
				 alt="start" />
			    <h4>Bli bättre på att använda miniräknaren.</h4>
			    <p>Att kunna använda sina grundkunskaper vid problemlösning
				krävs idag i grundskola och gymnasium.</p>
			</CardPanel>
		    </Col>
		    <Col s={4}>
			<CardPanel>
			    <img className="circle responsive-image col s12" 
				 src={window.location.origin + '/img/start3.JPG'} 
				 alt="start" />
			    <h4>Förstå och använda formler.</h4>
			    <p>Formler kan vara roligt och spännande om man förstår och kan använda dem.</p>
			</CardPanel>
		    </Col>
		</Row>
	    </div>
	)

    }
}

export default Home;
