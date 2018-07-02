import React, { Component } from "react";
import { Row, Divider } from 'react-materialize'

class Home extends Component {
    render() {
	return (
	    <div className="center">
		<Row>
		    <h4>Homepage</h4>
		    <Divider/>
		    <p>This is the Homepage content...</p>
		</Row>
	    </div>
	)

    }
}

export default Home;
