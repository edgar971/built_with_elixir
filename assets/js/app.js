import ReactDOM from 'react-dom'
import React from 'react'
import "phoenix_html"
import App from './components/app'
import StateAPI from './state'
// import socket from "./socket"

const store = new StateAPI({ projects: [] })

ReactDOM.render(<App store={store} />, document.querySelector('#app-root'))

