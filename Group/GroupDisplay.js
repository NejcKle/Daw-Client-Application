const React = require('react')
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

export default (props) => {
    if (props.containsData) {
        if (props.students_id.length > 0 && props.klass_id !== '') {
             return (
                <div>
                    <Table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Students limit</th><th>Class</th><th colSpan={props.students_id.length}>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.students_limit}</td><td><Link to={'/classes/' + props.klass_id}>{props.klass_id}</Link></td>
                                {props.students_id.map(student => (
                                    <td key={student}><Link to={'/students/' + student}>{student}</Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )
        }
        else if (props.students_id.length > 0) {
            return (
                <div>
                    <Table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Students limit</th><th>Class</th><th colSpan={props.students_id.length}>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.students_limit}</td><td>/</td>
                                {props.students_id.map(student => (
                                    <td key={student}><Link to={'/students/' + student}>{student}</Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )
        }
        else if (props.klass_id !== '') {
            return (
                <div>
                    <Table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Students limit</th><th>Class</th><th colSpan={props.students_id.length}>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.students_limit}</td><td><Link to={'/classes/' + props.klass_id}>{props.klass_id}</Link></td><td>/</td></tr>
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
                            <tr><th>Id</th><th>Name</th><th>Students limit</th><th>Class</th><th colSpan={props.students_id.length}>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.students_limit}</td><td>/</td><td>/</td></tr>
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
    else {
        return (
            <div>
                <span>No data available!</span>
            </div>
        )
    }
}