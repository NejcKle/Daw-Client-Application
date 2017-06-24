const ReactDom = require('react-dom')
const React = require('react')
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import Nav from './Navigation.js'

const App = () => (
    <div>
        <Redirect from='/' to='/home' />
        <Nav />
    </div>
)

ReactDom.render((
    <Router>
        <App />
    </Router>

), document.getElementById('root'));
