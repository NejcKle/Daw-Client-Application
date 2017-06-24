const React = require('react')
import { Link, Redirect } from 'react-router-dom'
import {Button, Table} from 'react-bootstrap'

export default (props) => {
    if (props.containsData) {
        //console.log(props.klasses_id);
            return (
                <div>
                    <Table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Number</th><th>Email</th><th colSpan={props.klasses_id.length}>Classes</th><th colSpan={props.courses_id.length}>Courses</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.number}</td><td>{props.email}</td>
                                {(props.klasses_id.length > 0)
                                    ? (props.klasses_id.map(klass => (
                                        <td key={klass}>
                                            <Link to={klass}>{klass.split('/').pop()}</Link>
                                        </td>
                                    )))
                                    : <td>'/'</td>}
                                {(props.courses_id.length > 0)
                                    ? (props.courses_id.map(course => (
                                        <td key={course}>
                                            <Link to={'/courses/' + course}>{course}</Link>
                                        </td>
                                    )))
                                    : <td>'/'</td>}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )
    }

    else {
        
        return (
        <div>
            <h1> Invalid Username </h1>
        </div>
    )}
}