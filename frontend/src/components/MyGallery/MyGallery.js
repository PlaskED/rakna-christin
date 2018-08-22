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
	    index: 0,
	    height: window.innerHeight
	}
	this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight
        const body = document.body
        const html = document.documentElement
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
        const windowBottom = windowHeight + window.pageYOffset
        if (windowBottom >= docHeight) {
	    this.getPhotos()
        }
    }

    componentDidMount() {
	this.getPhotos()
	window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
	window.removeEventListener("scroll", this.handleScroll);
    }

    getPhotos() {
	this.setState({pending: true})
	axios({
	    method:'get',
	    url: 'http://localhost:5000/api/images/'.concat(this.state.index),
	    headers: {
		Authorization: 'Bearer '.concat(this.props.accessToken)
	    }
	}).then(response => {
	    const newPhotos = response.data.data
	    this.setState({ 
		photos: this.state.photos.concat(newPhotos),
		pending: false,
		success: true 
	    })
	    if (newPhotos.length !== 0) {
		this.setState({ index: newPhotos[newPhotos.length-1].id })
	    }
	}).catch(err => { this.setState({error: err}) })
    }

    render() {
	let { pending, success, error, photos } = this.state
	const path = window.location.origin + '/uploads/photos/'
	const PHOTO_SET = photos.map(it => ({
	    src: path.concat(it.name),
	    thumbnail: path.concat(it.name),
	    
	}))

	if (pending) {
	    return (
		<Row><Loader/></Row>
	    )
	}
	if (error) {
	    return (
		<p className='text-error center'>{error.message}</p>
	    )
	}

	if (success) {
	    return (
		<Row> 
		    <Gallery images={PHOTO_SET} />
		</Row>
	    )
	} else { return null }
    }
}

export default MyGallery
