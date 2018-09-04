import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store'
import Main from './Main'
import Loader from './components/Loader/Loader'

// eslint-disable-next-line import/no-webpack-loader-syntax
import 'materialize-loader!./scss/materialize.config.js'

import WebFont from 'webfontloader';

WebFont.load({
    google: {
	families: ['Oswald:300,400,700', 'sans-serif']
    }
});

ReactDOM.render(
    <Provider store={store}>
	<PersistGate loading={<Loader/>} persistor={persistor}>
	    <Main/>
	</PersistGate>
    </Provider>,
    document.getElementById("root")
);
