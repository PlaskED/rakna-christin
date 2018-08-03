import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import { connect } from 'react-redux'
import axios from 'axios'
import Dropzone from 'react-dropzone'

import Loader from '../Loader/Loader'

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
	    //const newNotifications = response.data.data
	    //this.setState({ 
	    //notifications: this.state.notifications.concat(newNotifications),
	    this.setState({
		pending: false,
		success: true 
	    })
	    //if (newNotifications.length !== 0) {
	    //this.setState({ index: newNotifications[newNotifications.length-1].id })
	    //}
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
	    <div className="dropzone">
		{ accessToken && 
		  <Row>
		      <Col s={6}>
			  <Dropzone
			      accept="image/jpeg, image/png, image/jpg"
			      multiplie
			      onDrop={(files) => 
				  { this.onDrop(files) }}
			  >
			      <p>Drop files here to upload</p>
			  </Dropzone>
		      </Col>
		      <Col s={6}>
			  { pending && 
			    <div>
				<p>Uploading..</p>
				<Loader/>
			    </div>
			  }
			  { success &&
			    <div>
				<p>Success!</p>
			    </div>
			  }
			  { error &&
			    <div>
				<p>error.msg</p>
			    </div>
			  }
			  { (acceptedFiles.length > 0) &&
			    <div>
				<p>Laddar upp filer:</p>
				acceptedFiles.map(it => (
				    <p>{it}</p>
				))
			    </div>
			  }
			  { (rejectedFiles.length > 0) &&
			    <div>
				<p>Nekade filer:</p>
				acceptedFiles.map(it => (
				    <p>{it}</p>
				))
			    </div>
			  }
			  
		      </Col>
		  </Row>
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

const mapDispatchToProps = (dispatch) => {
    return {
	//login: (username, password) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, null)(DropzoneComponent)
