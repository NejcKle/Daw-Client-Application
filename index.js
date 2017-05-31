const ReactDom = require('react-dom')
const React = require('react')
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Layout from './Pages/Layout'
import students from './Pages/StudentListPage'
import student from './Pages/StudentDetailPage'
import courses from './Pages/CourseListPage'
import course from './Pages/CourseDetailPage'
import classes from './Pages/KlassListPage'
import klass from './Pages/KlassDetailPage'
import groups from './Pages/GroupListPage'
import group from './Pages/GroupDetailPage'
import teachers from './Pages/TeacherListPage'
import teacher from './Pages/TeacherDetailPage'
import './index.css';

const App = () => (
    <div>

        <Route exact path='/' component={Layout}></Route>
        <Route exact path='/students' component={students}></Route>
        <Route path='/students/:studentId' component={student}></Route>
        <Route exact path='/teachers' component={teachers}></Route>
        <Route path='/teachers/:teacherId' component={teacher}></Route>
        <Route exact path='/courses' component={courses}></Route>
        <Route path='/courses/:courseId' component={course}></Route>
        <Route exact path='/classes' component={classes}></Route>
        <Route path='/classes/:classId' component={klass}></Route>
        <Route exact path='/groups' component={groups}></Route>
        <Route path='/groups/:groupId' component={group}></Route>

    </div>
)

ReactDom.render((
    <Router>
        <App />
    </Router>
), document.getElementById('root'));
