import React, { Component } from 'react'
import { Row, Button } from 'react-materialize'
import { connect } from 'react-redux'
import Gallery from 'react-grid-gallery'

import { doGalleryRemove, 
	 doGalleryAdd,
	 doSetGalleryPhotos } from '../../redux/actions/gallery'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

class MyGallery extends Component {
    constructor(props) {
	super(props)
	this.onSelectImage = this.onSelectImage.bind(this)
	this.onDeleteImages = this.onDeleteImages.bind(this)
	this.getSelectedImages = this.getSelectedImages.bind(this);
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
        var img = images[index]
        if(img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected
        else
            img.isSelected = true
	this.props.doSetGalleryPhotos(images)
    }

    getSelectedImages () {
	return this.props.galleryPhotos
		   .filter(img => img.isSelected)
		   .map(img => img.alt)
    }

    onDeleteImages() {
	let { accessToken, galleryRemovePending,
	      galleryPhotos } = this.props
	if (!galleryRemovePending) {
	    this.props.doGalleryRemove(accessToken,
				       this.getSelectedImages(), galleryPhotos)
	}
    }

    getPhotos() {
	let { galleryPhotos } = this.props
	const path = window.location.origin + '/uploads/photos/'
	var lastIndex = 0
	if (galleryPhotos.length > 0)
	    lastIndex = galleryPhotos[galleryPhotos.length-1].alt
	this.props.doGalleryAdd(lastIndex, path)	
    }

    render() {
	let { accessToken, galleryRemovePending, galleryRemoveError, 
	      galleryAddPending, galleryAddError, galleryPhotos } = this.props
	var selection = this.getSelectedImages()
	var displayDelete = accessToken && selection.length > 0
	var allowSelection = accessToken != null

	return (
	    <div>
		<Row className="center">
		    <div id="gallery-scrollable">
			<Gallery images={galleryPhotos}
				 imageCountSeparator=' av '
				 enableImageSelection={allowSelection}
				 onSelectImage={this.onSelectImage}
				 backdropClosesModal={true}
			/>
		    </div>
		</Row>
		{ displayDelete && 
		  <Row>
		      <Button type='submit' waves='light'
			      icon='delete_forever' disabled={galleryRemovePending}
			      onClick={(e) => {
				      if (window.confirm('Vill du ta bort markerade bilder?')) this.onDeleteImages(e) } 
			      }>
			  Ta bort markerade</Button>
		  </Row> }
		{ galleryAddPending && <Row><Loader/></Row> }
		{ galleryAddError && <Error error={galleryAddError}/> }
		{ galleryRemovePending && <Row><p>Tar bort bilder, lämna inte sidan..</p><Loader/></Row>}
		{ galleryRemoveError && <Error error={galleryRemoveError}/> }
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
	galleryScrollable: state.reducerGallery.galleryScrollable,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
	doGalleryRemove: (token, imagesIdx, photos) =>
	    dispatch(doGalleryRemove(token, imagesIdx, photos)),
	doGalleryAdd: (lastIndex, path) =>
	    dispatch(doGalleryAdd(lastIndex, path)),
	doSetGalleryPhotos: (photos) =>
	    dispatch(doSetGalleryPhotos(photos))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGallery)
