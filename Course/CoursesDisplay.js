const React = require('react')
import Button from 'react-bootstrap/lib/Button'
import RemoveCourse from './CourseRemove'

export default (props) => {
    if (props.containsData) {
        //console.log("courses dispaly admin: " + props.admin);
        if (props.admin === true) {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr><td>Id</td><td>Name</td><td>Acronim</td></tr>
                            {props.courses.map(c => (
                                <tr key={c.id}><td><a href={'/courses/' + c.id}>{c.id}</a></td><td>{c.name}</td><td>{c.acronim}</td>
                                    <td><Button type="button" bsStyle="primary" onClick={() => RemoveCourse({ id: c.id })}>Remove</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr><td>Id</td><td>Name</td><td>Acronim</td></tr>
                            {props.courses.map(c => (
                                <tr key={c.id}><td><a href={'/courses/' + c.id}>{c.id}</a></td><td>{c.name}</td><td>{c.acronim}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
    else return (
        <div>
            <span>Course table contains no elements. </span>
        </div>
    )
}
