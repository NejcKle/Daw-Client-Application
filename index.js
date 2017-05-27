const ReactDom = require('react-dom')
const React = require('react')
import StudentListPage from './Student/StudentListPage'
import CourseListPage from './Course/CourseListPage'
import './index.css';

const App = () => (
    <div>
        <StudentListPage />
        <br/>
        <CourseListPage />
    </div>
)

ReactDom.render(
	<App />,
	document.getElementById('root')
)
