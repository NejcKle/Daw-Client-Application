const React = require('react')
import CourseList from '../Course/CourseList'
import CourseForm from '../Course/CourseForm'
import {Route} from 'react-router-dom'

export default () => (
    <div>
        <CourseList />
        <CourseForm />
    </div>
)
