const React = require('react')
import CourseList from '../Course/CourseList'
import CourseForm from '../Course/CourseForm'

export default (props) => {
    //console.log(props.loggedIn);
    //console.log("courseListPage adminn" + props.admin)
    if (props.admin === true) {
        return (
            <div>
                <h1> Course List </h1>
                <CourseList admin={props.admin} loggedIn={props.loggedIn} />
                <CourseForm />
            </div>
        )
    }

    else {
        return (
            <div>
                <h1> Course List </h1>
                <CourseList admin={props.admin} loggedIn={props.loggedIn} />
            </div>
        )
    }
}
