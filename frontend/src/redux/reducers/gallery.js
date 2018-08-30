import { GALLERY_REMOVE_PHOTOS, GALLERY_REMOVE_PENDING,
	 GALLERY_REMOVE_SUCCESS, GALLERY_REMOVE_ERROR, 
	 GALLERY_ADD_PHOTOS, GALLERY_ADD_PENDING,
	 GALLERY_ADD_SUCCESS, GALLERY_ADD_ERROR, 
	 GALLERY_SET_PHOTOS, GALLERY_SET_SCROLLABLE } from '../actions/types'

export default function reducerGallery(state = {
    galleryAddPending: false,
    galleryAddSuccess: false,
    galleryAddError: null,
    galleryRemovePending: false,
    galleryRemoveSuccess: false,
    galleryRemoveError: null,
    galleryPhotos: [],
    galleryScrollable: true,
}, action) {
    switch (action.type) {
	case GALLERY_ADD_PENDING:
	    return {
		...state,
		galleryAddPending: action.galleryAddPending
	    }
	case GALLERY_ADD_SUCCESS:
	    return {
		...state,
		galleryAddSuccess: action.galleryAddSuccess
	    }
	case GALLERY_ADD_ERROR:
	    return {
		...state,
		galleryAddError: action.galleryAddError
	    }
	case GALLERY_REMOVE_PENDING:
	    return {
		...state,
		galleryRemovePending: action.galleryRemovePending
	    }
	case GALLERY_REMOVE_SUCCESS:
	    return {
		...state,
		galleryRemoveSuccess: action.galleryRemoveSuccess
	    }
	case GALLERY_REMOVE_ERROR:
	    return {
		...state,
		galleryRemoveError: action.galleryRemoveError
	    }
	case GALLERY_ADD_PHOTOS:
	    return {
		...state,
		galleryPhotos: state.galleryPhotos.concat(action.newPhotos)
	    }
	case GALLERY_REMOVE_PHOTOS:
	    return {
		...state,
		galleryPhotos: state.galleryPhotos.filter(it => 
		    !action.imagesIdx.find(function(element) {
			return element === it.alt
		    })
		)
	    }
	case GALLERY_SET_PHOTOS:
	    return {
		...state,
		galleryPhotos: action.galleryPhotos
	    }
	case GALLERY_SET_SCROLLABLE:
	    return {
		...state,
		galleryScrollable: action.galleryScrollable
	    }
	default:
	    return state
    }
}
