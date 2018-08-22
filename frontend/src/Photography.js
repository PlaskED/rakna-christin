import React, { Component } from "react";
import { Row, Divider } from 'react-materialize'

import DropzoneComponent from './components/DropzoneComponent/DropzoneComponent'
import MyGallery from './components/MyGallery/MyGallery'

class Photography extends Component {
    render() {
	return (
	    <div className="center">
		<Row>
		    <h4>Fotografihörnan</h4>
		    <Divider/>
		    <MyGallery/>
		    <DropzoneComponent/>
		</Row>
	    </div>
	)

    }
}

export default Photography
