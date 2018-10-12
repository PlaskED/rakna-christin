import React, { Component } from 'react'
import { Divider } from 'react-materialize'

class DataAgreement extends Component {

    render() {
	return (
	    <div className="scrollable">
		<h4>Användaravtal</h4>
		<Divider/>
		<p>Dataskyddsförordningen GDPR reglerar hur vi hanterar och lagrar dina personuppgifter. Om du inte längre vill att vi ska lagra uppgifter om dig behöver du kontakta oss och begära att vi tar bort dina personuppgifter.</p>
		<h5>Vad lagrar vi?</h5>
		<p>Vi lagrar ditt namn, e-postadress, telefonnummer och vad du angett i klartext på intresseanmälan. Vi sparar personuppgifterna så länge som det behövs för de ändamål de samlades in eller så länge som det krävs enligt lagar och andra författningar. Vi lagrar endast det du har skickat in via intresseanmälan.</p>
		<h5>I vilka syften lagrar vi personuppgifter?</h5>
		<p>För att du ska kunna upprätta en kontakt med oss på ett smidigt och systematiskt sätt för att nyttja våra tjänster. Också för att snabbt få en övergripande bild av vilken tjänst du är intresserad av och när.</p>
		<h5>Dina rättigheter</h5>
		<p>Dina användaruppgifter lagras hos oss så länge vi anser behöva dem, men du kan när som helst kontakta oss för att få dina uppgifter raderade. Vi kan i framtiden komma att behöva ändra avtalet och kommer då be dig godkänna det på nytt.</p>
	    </div>
	)
    }
}

export default DataAgreement
