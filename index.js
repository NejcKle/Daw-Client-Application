const ReactDom = require('react-dom')
const React = require('react')
import StudentListPage from './Student/StudentListPage'
import './index.css';

const App = () => (
    <div>
        <StudentListPage />
    </div>
)

ReactDom.render(
	<App />,
	document.getElementById('root')
)
