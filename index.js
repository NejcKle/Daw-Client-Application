const ReactDom = require('react-dom')
const React = require('react')
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Layout from './Pages/Layout'
import students from './Pages/StudentListPage'
import student from './Pages/StudentDetail'
import courses from './Pages/CourseListPage'
import classes from './Pages/KlassListPage'
import groups from './Pages/GroupListPage'
import teachers from './Pages/TeacherListPage'
import teacher from './Pages/TeacherDetail'
import './index.css';

const App = () => (
    <div>

        <Route exact path='/' component={Layout}></Route>
        <Route exact path='/students' component={students}></Route>
        <Route path='/students/:studentId' component={student}></Route>
        <Route exact path='/teachers' component={teachers}></Route>
        <Route path='/teachers/:teacherId' component={teacher}></Route>
        <Route path='/courses' component={courses}></Route>
        <Route path='/classes' component={classes}></Route>
        <Route path='/groups' component={groups}></Route>

    </div>
)

ReactDom.render((
    <Router>
        <App />
    </Router>
), document.getElementById('root'));
