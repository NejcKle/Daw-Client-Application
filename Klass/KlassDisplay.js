const React = require('react')
import { Link } from 'react-router-dom'

export default (props) => {
    if (props.containsData) {
        if (props.teachers_id.length > 0 && props.students_id.length > 0) {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr><th>Id</th><th>Identifier</th><th>Auto enrollment</th><th colSpan={props.teachers_id.length}>Teachers</th><th colSpan={props.students_id.length}>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.identifier}</td><td>{props.auto_enrolment.toString()}</td>
                                {props.teachers_id.map(teacher => (
                                    <td key={teacher}><Link to={'/teachers/' + teacher}>{teacher}</Link>
                                    </td>
                                ))}
                                {props.students_id.map(student => (
                                    <td key={student}><Link to={'/students/' + student}>{student}</Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        else if (props.teachers_id.length > 0) {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr><th>Id</th><th>Identifier</th><th>Auto enrollment</th><th colSpan={props.teachers_id.length}>Teachers</th><th>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.identifier}</td><td>{props.auto_enrolment.toString()}</td>
                                {props.teachers_id.map(teacher => (
                                    <td key={teacher}><Link to={'/teachers/' + teacher}>{teacher}</Link>
                                    </td>
                                ))}
                                <td>/</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        else if (props.students_id.length > 0) {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr><th>Id</th><th>Identifier</th><th>Auto enrollment</th><th>Teachers</th><th colSpan={props.students_id.length}>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.identifier}</td><td>{props.auto_enrolment.toString()}</td><td>/</td>
                                {props.students_id.map(student => (
                                    <td key={student}><Link to={'/students/' + student}>{student}</Link>
                                    </td>
                                ))}
                            </tr>
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
                            <tr><th>Id</th><th>Identifier</th><th>Auto enrollment</th><th>Teachers</th><th>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.identifier}</td><td>{props.auto_enrolment.toString()}</td><td>/</td><td>/</td></tr>
                        </tbody>
                    </table>
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