import React, { Component } from 'react'
import { Row, Col, CardPanel } from 'react-materialize'
import axios from 'axios'

import Loader from '../Loader/Loader'

class Gallery extends Component {
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
		    <div className="col s12 center" id="gallery"> 
			{ photos.map(it => (
			    <div className="photo" key={it.id}>
				<img className='responsive-img col s4'
				     src={window.location.origin+'/uploads/photos/'.concat(it.name)}
				     alt={it.id}/>
			    </div>
			))	
			} 
		    </div> 
		</Row>
	    )
	} else { return null }
    }
}

export default Gallery
