import React, { Component } from 'react'
import { Input, Row, Col, Button, Divider, Icon } from 'react-materialize'
import { connect } from 'react-redux'
import axios from 'axios'
import Dropzone from 'react-dropzone'

class DropzoneComponent extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    acceptedFiles: [],
	    rejectedFiles: []
	}
    }

    onDrop(acceptedFiles, rejectedFiles) {
	// do stuff with files...
    }

    onDrop: acceptedFiles => {
	//const req = request.post('/upload');
	//acceptedFiles.forEach(file => {
        //    req.attach(file.name, file);
	//});
	//req.end(callback);
    }

    render() {
	let { accessToken } = this.props

	return (
	    <div className="dropzone">
		{ accessToken && 
		  <Dropzone
		      accept="image/jpeg, image/png"
		      onDrop={(accepted, rejected) => 
			  { this.setState({ accepted, rejected }); }}
		      >
		      <p>Drop files here to upload</p>
		  </Dropzone>
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
