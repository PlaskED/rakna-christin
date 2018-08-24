import React, { Component } from 'react'
import { Row } from 'react-materialize'
import axios from 'axios'
import Gallery from 'react-grid-gallery'

import Loader from '../Loader/Loader'

class MyGallery extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    pending: false,
	    error: null,
	    success: false,
	    photos: [],
	    index: 0
	}
    }

    componentDidMount() {
	this.getPhotos()
	document.addEventListener("scroll", this.trackScrolling)
    }
    componentWillUnmount() {
	document.removeEventListener("scroll", this.trackScrolling)
    }

    isBottom(elem) {
	if (!elem)
	    return null
	return elem.getBoundingClientRect().bottom <= window.innerHeight
    }

    trackScrolling = () => {
	const wrappedElement = document.getElementById('gallery-scrollable')
	if (this.isBottom(wrappedElement)) {
	    this.getPhotos()
	}
    };

    getPhotos() {
	document.removeEventListener('scroll', this.trackScrolling)
	this.setState({pending: true})
	axios({
	    method:'get',
	    url: 'http://localhost:5000/api/images/'.concat(this.state.index),
	    headers: {
		Authorization: 'Bearer '.concat(this.props.accessToken)
	    }
	}).then(response => {
	    const newPhotos = response.data.data
	    const path = window.location.origin + '/uploads/photos/'
	    this.setState({ 
		photos: this.state.photos.concat(newPhotos.map(it => ({
		    src: path.concat(it.name),
		    thumbnail: path.concat(it.name)  
		}))),
		pending: false,
		success: true,
	    })
	    if (newPhotos.length !== 0) {
		this.setState({ index: newPhotos[newPhotos.length-1].id })
		document.addEventListener('scroll', this.trackScrolling)
	    }
	}).catch(err => { 
	    this.setState({error: err})
	    document.addEventListener('scroll', this.trackScrolling)
	})
    }

    render() {
	let { pending, success, error, photos } = this.state

	if (error) {
	    return (
		<p className='text-error center'>{error.message}</p>
	    )
	} else {
	    return (
		<div>
		    <Row id='gallery-scrollable'> 
			<Gallery images={photos} imageCountSeparator=' av ' />
		    </Row>
		    { pending && <Row><Loader/></Row> }
		</div>
	    )
	}
    }
}

export default MyGallery
