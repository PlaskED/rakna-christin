import React, { Component } from "react";
import { Carousel, Button } from 'react-materialize'
// eslint-disable-next-line 
import M from 'materialize-css'

let $ = require('jquery');

class MyCarousel extends Component {
    
    componentDidMount() {
	var carousel_interval = 5000
	setInterval(function() {
	    $('.carousel').carousel('next');
	}, carousel_interval);
    }
    render() {
	return (
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
	    </Carousel>
	)
    }
}
export default MyCarousel
