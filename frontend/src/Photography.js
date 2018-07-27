import React, { Component } from "react";
import { Row, Divider, Col} from 'react-materialize'

import DropzoneComponent from './components/DropzoneComponent/DropzoneComponent'

class Photography extends Component {
    render() {
	return (
	    <div className="center">
		<Row>
		    <h4>Fotografihörnan</h4>
		    <Divider/>
		    <Col s={6}>
			<DropzoneComponent/>
		    </Col>
		</Row>
	    </div>
	)

    }
}

export default Photography
