const ReactDom = require('react-dom')
const React = require('react')
import StudentListPage from './Student/StudentListPage'
import CourseListPage from './Course/CourseListPage'
import KlassListPage from './Klass/KlassListPage'
import GroupListPage from './Group/GroupListPage'
import TeacherListPage from './Teacher/TeacherListPage'
import './index.css';

const App = () => (
    <div>
        <StudentListPage />
        <br/>
        <CourseListPage />
        <br/>
        <KlassListPage />
        <br/>
        <GroupListPage />
        <br/>
        <TeacherListPage />
    </div>
)

ReactDom.render(
	<App />,
	document.getElementById('root')
)
