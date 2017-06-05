const ReactDom = require('react-dom')
const React = require('react')
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Layout from './Pages/Layout'
import students from './Pages/StudentListPage'
import student from './Pages/StudentDetailPage'
import courses from './Pages/CourseListPage'
import course from './Pages/CourseDetailPage'
import classes from './Pages/KlassListPage'

import classesListed from './Pages/KlassListPageSorted'

import klass from './Pages/KlassDetailPage'
import groups from './Pages/GroupListPage'
import group from './Pages/GroupDetailPage'
import teachers from './Pages/TeacherListPage'
import teacher from './Pages/TeacherDetailPage'
import login from './Login/LoginPage'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import Nav from './Navigation.js'

const App = () => (
    <div>

        <Nav/>

    </div>
)

ReactDom.render((
    <Router>
        <App />
    </Router>
), document.getElementById('root'));
