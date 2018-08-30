import React, { Component } from 'react'
import { Row } from 'react-materialize'
import { connect } from 'react-redux'
import axios from 'axios'
import Dropzone from 'react-dropzone'

import Loader from '../Loader/Loader'
import Error from '../Error/Error'

class DropzoneComponent extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    pending: false,
	    error: null,
	    success: false,
	    acceptedFiles: [],
	    rejectedFiles: []
	}
    }

    sendFiles(files) {
	this.setState({pending: true})
	axios({
	    method:'post',
	    url: 'http://localhost:5000/api/image/upload',
	    data: files,
	    headers: {
		Authorization: 'Bearer '.concat(this.props.accessToken),
		'content-type': 'multipart/form-data'
	    }
	}).then(response => {
	    this.setState({
		pending: false,
		success: true 
	    })
	}).catch(err => { this.setState({error: err}) })
    }

    onDrop(acceptedFiles, rejectedFiles) {
	if (acceptedFiles.length > 0) {
	    var files = new FormData();
	    var newAcceptedFiles = []
	    acceptedFiles.forEach(file => {
		files.append(file.name, file)
		newAcceptedFiles.concat(file.name)
	    })
	    this.setState({ acceptedFiles: newAcceptedFiles })
	    this.sendFiles(files)
	}
	if (rejectedFiles > 0) {
	    const newRejectedFiles = rejectedFiles.map(file => {
		return file.name 
	    })
	    this.setState({ 
		rejectedFiles: this.state.rejectedFiles.concat(newRejectedFiles)
	    })
	}
    }

    render() {
	let { accessToken } = this.props
	let { pending, success, error, acceptedFiles, rejectedFiles } = this.state;

	return (
	    <div className="center">
		{ accessToken && 
		  <div className="dropzone">
		      <Row>
			  <Dropzone
			      accept="image/jpeg, image/png, image/jpg"
			      multiplie="true"
			      onDrop={(files) => 
				  { this.onDrop(files) }}
			  >
			      <p>Släpp filer här för att ladda upp</p>
			  </Dropzone>
		      </Row>
		      <Row className="left">
			  { pending && 
			    <div>
				<p>Laddar upp..</p>
				<Loader/>
			    </div>
			  }
			  { success &&
			    <div>
				<p>Klart!</p>
			    </div>
			  }
			  <Error error={error}/>
			  { (acceptedFiles.length > 0) &&
			    <div>
				<p>Laddar upp filer:</p>
				acceptedFiles.map(it => (
				<span>{it}, </span>
				))
			    </div>
			  }
			  { (rejectedFiles.length > 0) &&
			    <div>
				<p>Nekade filer:</p>
				rejectedFiles.map(it => (
				<span>{it}, </span>
				))
			    </div>
			  }
		      </Row>
		  </div>
		}
	    </div>
	)
    }
}

const mapStateToProps = (state) => {
    return {
	accessToken: state.reducerToken.accessToken
    }
}

export default connect(mapStateToProps, null)(DropzoneComponent)
