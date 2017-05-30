const React = require('react')
import {Link} from 'react-router-dom'

import RemoveTeacher from './TeacherRemove'

export default (props) => {
    if (props.containsData) {
        return (
            <div>
                <table>
                    <tbody>
                        <tr><td>Id</td><td>Name</td><td>Number</td><td>Email</td><td>Admin</td></tr>
                        {props.teachers.map(t => (
                            <tr key={t.id}><td><Link to={'/teachers/' + t.id}>{t.id}</Link></td><td>{t.name}</td><td>{t.number}</td><td>{t.email}</td><td>{t.admin.toString()}</td>
                                <td><button type="button" onClick={() => RemoveTeacher({ id: t.id })}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    else return (
        <div>
            <span>Teacher table contains no elements. </span>
        </div>
    )
}