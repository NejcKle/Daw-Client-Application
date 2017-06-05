const React = require('react')
import CourseList from '../Course/CourseList'
import CourseForm from '../Course/CourseForm'

export default (props) => {
    //console.log("courseListPage adminn" + props.admin)
    if (props.admin === true) {
        return (
            <div>
                <CourseList admin={props.admin} />
                <CourseForm />
            </div>
        )
    }

    else {
        return (<CourseList admin={props.admin} />)
    }
}
