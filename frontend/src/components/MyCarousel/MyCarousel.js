import React, { Component } from "react";
import { Button } from 'react-materialize'
import { NavLink } from 'react-router-dom'

import FaceBookSlider from '../FaceBook/FaceBookSlider'

let $ = require('jquery');

class MyCarousel extends Component {
    
    componentDidMount() {
	$(document).ready(function(){
	    $('.slider').slider();
	});
    }
    render() {
	let img_url = window.location.origin + '/img/'
	let imgs = [
	    img_url.concat('carousel_1.JPG'),
	    img_url.concat('carousel_2.JPG'),
	    img_url.concat('carousel_3.JPG'),
	    img_url.concat('carousel_4.JPG')
	]
	return (
	    <div className="slider">
		<ul className="slides">
		    <li>
			<img src={imgs[0]} alt=""/>
			<div className="caption center-align">
			    <h2>Räkna med Christin</h2>
			    <p className='white-text'>Matematikundervisning på grundskole- och gymnasienivå</p>
			    <NavLink to='/info'>
				<Button waves='light'>Mer info</Button>
			    </NavLink>
			</div>
		    </li>
		    <li>
			<img src={imgs[1]} alt=""/>
			<div className="caption center-align">
			    <h2>Vi finns även på facebook</h2>
			    <FaceBookSlider/>
			</div>
		    </li>
		    <li>
			<img src={imgs[2]} alt=""/>
			<div className="caption center-align">
			    <h2>Undervisning på dina villkor</h2>
			    <p className='white-text'>Vi lägger upp en personlig plan</p>
			</div>
		    </li>
		    <li>
			<img src={imgs[3]} alt=""/>
			<div className="caption center-align">
			    <h2>Fotografihörnan</h2>
			    <p className='white-text'>Är du intresserad av att använda bilder från oss?</p>
			    <NavLink to='/fotografi'>
				<Button waves='light'>
				    Till Fotografihörnan
				</Button>
			    </NavLink>
			</div>
		    </li>
		</ul>
	    </div>
	)
    }
}
export default MyCarousel
