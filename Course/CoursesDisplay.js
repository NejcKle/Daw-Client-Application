const React = require('react')
import {Button, Table} from 'react-bootstrap'
import RemoveCourse from './CourseRemove'
import {Link} from 'react-router-dom'

export default (props) => {
    if (props.containsData) {
        //console.log("courses dispaly admin: " + props.admin);
        if (props.admin === true) {
            return (
                <div>
                    <Table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Acronim</th></tr>
                            {props.courses.map(c => (
                                <tr key={c.id}><td><Link to={'/courses/' + c.id}>{c.id}</Link></td><td>{c.name}</td><td>{c.acronim}</td>
                                    <td><Button type="button" bsStyle="primary" onClick={() => RemoveCourse({ id: c.id })}>Remove</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Table>
                        <tbody>
                             <tr><th>Id</th><th>Name</th><th>Acronim</th></tr>
                            {props.courses.map(c => (
                                <tr key={c.id}><td><Link to={'/courses/' + c.id}>{c.id}</Link></td><td>{c.name}</td><td>{c.acronim}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
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
