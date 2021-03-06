import axios from 'axios'
import { GALLERY_ADD_PENDING, GALLERY_ADD_SUCCESS, 
	 GALLERY_ADD_ERROR, GALLERY_REMOVE_PENDING,
	 GALLERY_REMOVE_SUCCESS, GALLERY_REMOVE_ERROR,
	 GALLERY_ADD_PHOTOS, GALLERY_REMOVE_PHOTOS,
	 GALLERY_SET_PHOTOS, GALLERY_SET_SCROLLABLE } from './types'
import { api } from '../../globals'

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
	    url: api.concat('/image/delete'),
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

function callGalleryAddApi(lastIndex, cb) {
    axios({
	method:'get',
	url: api.concat('/images/'.concat(lastIndex))
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
	    } else {
		dispatch(setGalleryRemoveError(cb))
	    }
	})
	dispatch(setGalleryScrollable(true))
    }
}

export function doGalleryAdd(lastIndex, path) {
    return dispatch => {
	dispatch(setGalleryAddPending(true))
	dispatch(setGalleryAddSuccess(false))
	dispatch(setGalleryAddError(null))
	dispatch(setGalleryScrollable(false))
	
	callGalleryAddApi(lastIndex, cb => {
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

export function doSetGalleryPhotos(photos) {
    return dispatch => {
	dispatch(setGalleryPhotos(photos))
    }
}
