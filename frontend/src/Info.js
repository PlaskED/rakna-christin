import React, { Component } from "react";
import { Row, Divider } from 'react-materialize'

class Info extends Component {
    render() {
	return (
	    <div>
		<Row className="center">
		    <h2>Info</h2>
		    <Divider/>
		</Row>
		<Row>
		    <p>
			Bli säker på matematik i den kursen/området 
			som du just nu läser på grundskole- eller gymnasienivå. 
			Tycker du att det är svårt med matematik eller vill du
			bara höja ditt betyg så är du välkommen att höra av dig. 
		    </p>
		    <img className="responsive-image col s6 m4 wrap-img"
			 src={window.location.origin + 
								   '/img/info.JPG'} 
		    alt="Logo" />
		    <p>
			Jag hittar snabbt dina matematiska förmågor och ser var
			kunskapen behöver stärkas för att du ska lyckas så bra
			som möjligt att nå dina mål. <br/>Undervisningen sker
			hemma hos mig eller dig. Vid undervisning hos mig på 
			Enstigen i Rönninge finns det en bra undervisningsmiljö
			för bästa inlärning.<br/> Till vårt förfogande finns det 
			bland annat whiteboard, miniräknare, dator, laborativt 
			material, läroböcker med mera för att optimera pluggandet.
		    </p>
		    <p>
			Vi lägger upp en personlig plan allt beroende på dina
			önskemål och behov. 
		    </p>
		    <h4>Lite kort om mig</h4>
		    <p>
			Jag utbildade mig för 10 år sedan på lärarhögskolan i 
			Stockholm och är en erfaren matematiklärare som arbetat 
			både på grundskola och gymnasium.
		    </p>
		</Row>
	    </div>
	)

    }
}

export default Info;
