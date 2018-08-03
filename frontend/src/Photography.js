import React, { Component } from "react";
import { Row, Divider } from 'react-materialize'

import DropzoneComponent from './components/DropzoneComponent/DropzoneComponent'

class Photography extends Component {
    render() {
	return (
	    <div className="center">
		<Row>
		    <h4>Fotografihörnan</h4>
		    <Divider/>
		    <DropzoneComponent/>
		</Row>
	    </div>
	)

    }
}

export default Photography
