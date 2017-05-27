const React = require('react')

import RemoveCourse from './CourseRemove'

export default (props) => {
    if (props.containsData) {
        return (
            <div>
                <table>
                    <tbody>
                        <tr><td>Name</td><td>Acronim</td><td>Id</td></tr>
                        {props.courses.map(c => (
                            <tr key={c.id}><td>{c.name}</td><td>{c.acronim}</td><td>{c.id}</td>
                                <td><button type="button" onClick={() => RemoveCourse({ id: c.id })}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    else return (
        <div>
            <span>Course table contains no elements. </span>
        </div>
    )
}
