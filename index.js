const ReactDom = require('react-dom')
const React = require('react')
import StudentListPage from './Student/StudentListPage'
import CourseListPage from './Course/CourseListPage'
import KlassListPage from './Klass/KlassListPage'
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
        <TeacherListPage />
    </div>
)

ReactDom.render(
	<App />,
	document.getElementById('root')
)
