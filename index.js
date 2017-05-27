const ReactDom = require('react-dom')
const React = require('react')
import StudentListPage from './Student/StudentListPage'
import CourseListPage from './Course/CourseListPage'
import KlassListPage from './Klass/KlassListPage'
import './index.css';

const App = () => (
    <div>
        <StudentListPage />
        <br/>
        <CourseListPage />
        <br/>
        <KlassListPage />
    </div>
)

ReactDom.render(
	<App />,
	document.getElementById('root')
)
