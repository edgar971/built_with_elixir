import 'babel-polyfill'
import ReactDOM from 'react-dom'
import React from 'react'
import "phoenix_html"
import App from './components/app'
import StateAPI from './state'
import GA from './ga'
import SubmitProjectForm from './components/submitProjectForm';
// import socket from "./socket"

GA.pageview('/');

const store = new StateAPI()

ReactDOM.render(<App store={store} />, document.querySelector('#app-root'))

