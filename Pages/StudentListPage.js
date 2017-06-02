const React = require('react')
import StudentList from '../Student/StudentList'
import StudentForm from '../Student/StudentForm'
import {Route} from 'react-router-dom'

export default () => (
    <div>
        <StudentList />
        <br/>
        <StudentForm />
    </div>
)
