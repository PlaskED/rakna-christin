import React, { Component } from "react";
import { Row, Col, CardPanel } from 'react-materialize'
import FaceBook from './components/FaceBook/FaceBook'
import MyCarousel from './components/MyCarousel/MyCarousel'

class Home extends Component {
   
    componentDidMount() {
	const FB = window.FB;
	if (FB)
	    FB.XFBML.parse();
    }

    render() {
	return (
	    <div className="center">
		<Row/>
		<Row>
		    <MyCarousel/>
		</Row>
		<Row>
		    <Col s={12} m={4}>
			<CardPanel>
			    <h4>Kolla in oss på facebook!</h4>
			    <FaceBook/>
			</CardPanel>
		    </Col>
		    <Col s={12} m={4}>
			<CardPanel>
			    <img className="circle responsive-image col s12" 
				 src={window.location.origin + '/img/start2.JPG'} 
				 alt="start" />
			    <h4>Bli bättre på att använda miniräknaren.</h4>
			    <p>Att kunna använda sina grundkunskaper vid problemlösning
				krävs idag i grundskola och gymnasium.</p>
			</CardPanel>
		    </Col>
		    <Col s={12} m={4}>
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
