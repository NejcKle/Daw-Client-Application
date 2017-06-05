const React = require('react')
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

export default (props) => {
    if (props.containsData) {
        return (
            <div>
                <Table>
                    <tbody>
                        <tr><th>Id</th><th>Identifier</th><th>Auto enrollment</th><th colSpan={props.teachers_id.length}>Teachers</th><th colSpan={props.students_id.length}>Students</th><th colSpan={props.groups_id.length}>Groups</th></tr>
                        <tr key={props.id}><td>{props.id}</td><td>{props.identifier}</td><td>{props.auto_enrolment.toString()}</td>
                            {(props.teachers_id.length > 0)
                                ? (props.teachers_id.map(teacher => (
                                    <td key={teacher}><Link to={'/teachers/' + teacher}>{teacher}</Link>
                                    </td>
                                )))
                                : <td>/</td>}
                            {(props.students_id.length > 0)
                                ? (props.students_id.map(student => (
                                    <td key={student}><Link to={'/students/' + student}>{student}</Link>
                                    </td>
                                )))
                                : <td>/</td>}
                            {(props.groups_id.length > 0) ? (props.groups_id.map(group => (
                                <td key={group}><Link to={'/groups/' + group}>{group}</Link>
                                </td>
                            ))) : <td>/</td>}
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
    else {
        return (
            <div>
                <span>No data available!</span>
            </div>
        )
    }
}