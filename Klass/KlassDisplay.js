const React = require('react')
import { Link } from 'react-router-dom'

export default (props) => {
    if (props.containsData) {
        return (
            <div>
                <table>
                    <tbody>
                        <tr><th>Id</th><th>Identifier</th><th>Auto enrollment</th><th colSpan={props.teachers_id.length}>Teachers</th><th colSpan={props.students_id.length}>Students</th><th colSpan={props.groups_id.length}>Groups</th></tr>
                        <tr key={props.id}><td>{props.id}</td><td>{props.identifier}</td><td>{props.auto_enrolment.toString()}</td>
                            {(props.teachers_id.length > 0) ? (props.teachers_id.map(teacher => (
                                <td key={teacher}><Link to={'/teachers/' + teacher}>{teacher}</Link>
                                </td>
                            ))) : "/"}
                            {(props.students_id.length > 0) ? (props.students_id.map(student => (
                                <td key={student}><Link to={'/students/' + student}>{student}</Link>
                                </td>
                            ))) : "/"}
                            {(props.groups_id.length > 0) ? (props.groups_id.map(group => (
                                <td key={group}><Link to={'/groups/' + group}>{group}</Link>
                                </td>
                            ))) : "/"}
                        </tr>
                    </tbody>
                </table>
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