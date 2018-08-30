import React, { Component } from 'react'
import { Row, Button } from 'react-materialize'
import { connect } from 'react-redux'
import Gallery from 'react-grid-gallery'

import { doGalleryRemove, 
	 doGalleryAdd,
	 doSetGalleryPhotos, 
	 doSetGallerySelection } from '../../redux/actions/gallery'
import Loader from '../Loader/Loader'

class MyGallery extends Component {
    constructor(props) {
	super(props)
	this.onSelectImage = this.onSelectImage.bind(this)
	this.onDeleteImages = this.onDeleteImages.bind(this)
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
	if (this.isBottom(wrappedElement) && this.props.galleryScrollable) {
	    this.getPhotos()
	}
    }

    onSelectImage(index, image) {
        var images = this.props.galleryPhotos.slice()
	var selection = this.props.gallerySelection.slice()
        var img = images[index]
	var newSelection = []
        if(img.hasOwnProperty("isSelected")) {
            img.isSelected = !img.isSelected
	    newSelection = selection.filter(it => it !== img.alt)
        } else {
            img.isSelected = true
	    newSelection = selection.concat(img.alt)
	}
	this.props.doSetGalleryPhotos(images)
	this.props.doSetGallerySelection(newSelection)
    }

    onDeleteImages() {
	let { accessToken, galleryRemovePending,
	      galleryPhotos, gallerySelection } = this.props
	if (!galleryRemovePending) {
	    this.props.doGalleryRemove(accessToken,
				       gallerySelection, galleryPhotos)
	}
    }

    getPhotos() {
	let { accessToken, galleryPhotos } = this.props
	const path = window.location.origin + '/uploads/photos/'
	var lastIndex = 0
	if (galleryPhotos.length > 0)
	    lastIndex = galleryPhotos[galleryPhotos.length-1].alt
	this.props.doGalleryAdd(accessToken, lastIndex, path)	
    }

    render() {
	let { accessToken, galleryRemovePending, galleryRemoveError, 
	      galleryAddPending, galleryAddError, galleryPhotos,
	      gallerySelection } = this.props
	var displayDelete = accessToken && gallerySelection.length > 0
	var allowSelection = accessToken != null

	return (
	    <div>
		<Row id='gallery-scrollable'> 
		    <Gallery images={galleryPhotos}
			     imageCountSeparator=' av '
			     enableImageSelection={allowSelection}
			     onSelectImage={this.onSelectImage}
			     backdropClosesModal={true}
		    />
		</Row>
		{ displayDelete && 
		  <Row>
		      <Button type='submit' waves='light' icon='delete_forever'
			      onClick={(e) => {
				      if (window.confirm('Vill du ta bort markerade bilder?')) this.onDeleteImages(e) } 
			      }>
			  Ta bort markerade</Button>
		  </Row> }
		    { galleryAddPending && <Row><Loader/></Row> }
		    { galleryAddError && <p className='text-error center'>{galleryAddError.message}</p> }
		    { galleryRemovePending && <Row><p>Tar bort bilder, lämna inte sidan..</p><Loader/></Row>}
		    { galleryRemoveError && <p className='text-error center'>{galleryRemoveError.message}</p> }
	    </div>
	)
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken,
	galleryRemovePending: state.reducerGallery.galleryRemovePending,
	galleryRemoveError: state.reducerGallery.galleryRemoveError,
	galleryAddPending: state.reducerGallery.galleryAddPending,
	galleryAddError: state.reducerGallery.galleryAddError,
	galleryPhotos: state.reducerGallery.galleryPhotos,
	gallerySelection: state.reducerGallery.gallerySelection,
	galleryScrollable: state.reducerGallery.galleryScrollable,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
	doGalleryRemove: (token, imagesIdx, photos) =>
	    dispatch(doGalleryRemove(token, imagesIdx, photos)),
	doGalleryAdd: (token, lastIndex, path) =>
	    dispatch(doGalleryAdd(token, lastIndex, path)),
	doSetGalleryPhotos: (photos) =>
	    dispatch(doSetGalleryPhotos(photos)),
	doSetGallerySelection: (selection) =>
	    dispatch(doSetGallerySelection(selection))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGallery)
