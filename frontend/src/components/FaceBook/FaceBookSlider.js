import React, { Component } from "react";

class FaceBookSlider extends Component {
    render() {
	return(
	    <div className="fb-page"
		data-width="400"
		 data-href="https://www.facebook.com/raknamedchristin/"
		 data-small-header="true"
		 data-adapt-container-width="true"
		 data-hide-cover="false"
		 data-show-facepile="false">
		<blockquote cite="https://www.facebook.com/raknamedchristin/"
			    className="fb-xfbml-parse-ignore">
		    <a href="https://www.facebook.com/raknamedchristin/">
			Räkna med Christin</a>
		</blockquote>
	    </div>
	)
    }
}
export default FaceBookSlider;
