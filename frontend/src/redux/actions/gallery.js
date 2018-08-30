import axios from 'axios'
import { GALLERY_ADD_PENDING, GALLERY_ADD_SUCCESS, 
	 GALLERY_ADD_ERROR, GALLERY_REMOVE_PENDING,
	 GALLERY_REMOVE_SUCCESS, GALLERY_REMOVE_ERROR,
	 GALLERY_ADD_PHOTOS, GALLERY_REMOVE_PHOTOS,
	 GALLERY_SET_PHOTOS, GALLERY_SET_SELECTION,
	 GALLERY_SET_SCROLLABLE } from './types'

function setGalleryAddPending(galleryAddPending) {
    return {
	type: GALLERY_ADD_PENDING,
	galleryAddPending
    }
}

function setGalleryAddSuccess(galleryAddSuccess) {
    return {
	type: GALLERY_ADD_SUCCESS,
	galleryAddSuccess
    }
}

function setGalleryAddError(galleryAddError) {
    return {
	type: GALLERY_ADD_ERROR,
	galleryAddError
    }
}

function setGalleryRemovePending(galleryRemovePending) {
    return {
	type: GALLERY_REMOVE_PENDING,
	galleryRemovePending
    }
}

function setGalleryRemoveSuccess(galleryRemoveSuccess) {
    return {
	type: GALLERY_REMOVE_SUCCESS,
	galleryRemoveSuccess
    }
}

function setGalleryRemoveError(galleryRemoveError) {
    return {
	type: GALLERY_REMOVE_ERROR,
	galleryRemoveError
    }
}

function addGalleryPhotos(newPhotos) {
    return {
	type: GALLERY_ADD_PHOTOS,
	newPhotos
    }
}

function removeGalleryPhotos(imagesIdx) {
    return {
	type: GALLERY_REMOVE_PHOTOS,
	imagesIdx
    }
}

function setGalleryPhotos(galleryPhotos) {
    return {
	type: GALLERY_SET_PHOTOS,
	galleryPhotos
    }
}

function setGallerySelection(gallerySelection) {
    return {
	type: GALLERY_SET_SELECTION,
	gallerySelection
    }
}

function setGalleryScrollable(galleryScrollable) {
    return {
	type: GALLERY_SET_SCROLLABLE,
	galleryScrollable
    }
}

/* imagesIdx is array of ints with images to delete id */
function callGalleryRemoveApi(accessToken, imagesIdx, cb) {
    setTimeout(() => {
	axios({
	    method:'post',
	    url: 'http://localhost:5000/api/image/delete',
	    data: { delete_images: imagesIdx },
	    headers: {
		Authorization: 'Bearer '.concat(accessToken)
	    }
	}).then(function(response) {
	    return cb(response)
	}).catch(function(err) {
	    return cb(err)
	})
    }, 5000)
}

function callGalleryAddApi(accessToken, lastIndex, cb) {
    axios({
	method:'get',
	url: 'http://localhost:5000/api/images/'.concat(lastIndex),
	headers: {
	    Authorization: 'Bearer '.concat(accessToken)
	}
    }).then(function(response) {
	return cb(response)
    }).catch(function(err) {
	return cb(err)
    })
}

export function doGalleryRemove(accessToken, imagesIdx, photos) {
    return dispatch => {
	dispatch(setGalleryRemovePending(true))
	dispatch(setGalleryRemoveSuccess(false))
	dispatch(setGalleryRemoveError(null))
	dispatch(setGalleryScrollable(false))
	
	callGalleryRemoveApi(accessToken, imagesIdx, cb => {
	    dispatch(setGalleryRemovePending(false))
	    if (cb.status === 204) {
		dispatch(setGalleryRemoveSuccess(true))
		dispatch(removeGalleryPhotos(imagesIdx))
		dispatch(setGallerySelection([]))
	    } else {
		dispatch(setGalleryRemoveError(cb))
	    }
	})
	dispatch(setGalleryScrollable(true))
    }
}

export function doGalleryAdd(accessToken, lastIndex, path) {
    return dispatch => {
	dispatch(setGalleryAddPending(true))
	dispatch(setGalleryAddSuccess(false))
	dispatch(setGalleryAddError(null))
	dispatch(setGalleryScrollable(false))
	
	callGalleryAddApi(accessToken, lastIndex, cb => {
	    dispatch(setGalleryAddPending(false))
	    if (cb.status === 200) {
		dispatch(setGalleryAddSuccess(true))
		const newPhotos = cb.data.data
		const photosToAdd = newPhotos.map(it => ({
		    src: path.concat(it.name),
		    thumbnail: path.concat(it.name),
		    alt: it.id.toString(),
		}))
		if (newPhotos.length > 0) {
		    dispatch(addGalleryPhotos(photosToAdd))
		    dispatch(setGalleryScrollable(true))
		}
	    } else {
		dispatch(setGalleryAddError(cb))
		dispatch(setGalleryScrollable(true))
	    }
	})
    }
}

export function doSetGallerySelection(selection) {
    return dispatch => {
	dispatch(setGallerySelection(selection))
    }
}

export function doSetGalleryPhotos(photos) {
    return dispatch => {
	dispatch(setGalleryPhotos(photos))
    }
}
