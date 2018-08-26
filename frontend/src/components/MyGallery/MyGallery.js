import React, { Component } from 'react'
import { Row, Button } from 'react-materialize'
import { connect } from 'react-redux'
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
	    selection: null,
	}
	this.onSelectImage = this.onSelectImage.bind(this);
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
    }

    onSelectImage (index, image) {
        var images = this.state.photos.slice()
        var img = images[index]
	var found = false
        if(img.hasOwnProperty("isSelected")) {
            img.isSelected = !img.isSelected
	    found = images.find(it => it.isSelected === true) ? true : false
	    this.setState({ photos: images, selection: found})
        } else {
            img.isSelected = true
	    found = true
	}
	this.setState({ photos: images, selection: found})
    }

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
		    thumbnail: path.concat(it.name),
		    minHeight: "1px",
                    width: "100%",
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
	let { accessToken } = this.props
	let { pending, success, error, photos, selection } = this.state

	if (error) {
	    return (
		<p className='text-error center'>{error.message}</p>
	    )
	} else {
	    return (
		<div>
		    <Row id='gallery-scrollable'> 
			<Gallery images={photos} 
				 imageCountSeparator=' av '
				 onSelectImage={this.onSelectImage}
			/>
		    </Row>
		    { accessToken && selection &&
		      <Row>
			  <Button type='submit' waves='light' icon='delete_forever'>Ta bort markerade</Button>
		      </Row> }
		    { pending && <Row><Loader/></Row> }
		</div>
	    )
	}
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken
    }
}

export default connect(mapStateToProps, null)(MyGallery)
