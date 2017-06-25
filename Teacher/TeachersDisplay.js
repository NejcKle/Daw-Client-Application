const React = require('react')
import { Link } from 'react-router-dom'

import RemoveTeacher from './TeacherRemove'
import KlassConnectTeacher from '../Klass/KlassConnectTeacher'
import KlassDisconnectTeacher from '../Klass/KlassDisconnectTeacher'
import {Button, Table} from 'react-bootstrap'

export default (props) => {
    if (props.containsData) {
        //console.log(document.URL);
        var url = document.URL;
        if (url.includes('/courses/')) {
            return (
                <div>
                    <Table>
                        <tbody>
                            <tr><td>Id</td><td>Name</td><td>Number</td><td>Email</td><td>Admin</td></tr>
                            {props.notConnectedTeachers.map(t => (
                                <tr key={t.id}><td><Link to={'/teachers/' + t.id}>{t.id}</Link></td><td>{t.name}</td><td>{t.number}</td><td>{t.email}</td><td>{t.admin.toString()}</td>
                                    <td><Button type="button" onClick={() => {
                                        KlassConnectTeacher({ teacherId: t.id, classId: props.classId.split('/').pop() })
                                    }}>Add teacher</Button></td>
                                </tr>
                            ))}
                            {props.connectedTeachers.map(t => (
                                <tr key={t.id}><td><Link to={'/teachers/' + t.id}>{t.id}</Link></td><td>{t.name}</td><td>{t.number}</td><td>{t.email}</td><td>{t.admin.toString()}</td>
                                    <td><Button type="button" onClick={() => {
                                        KlassDisconnectTeacher({ teacherId: t.id, classId: props.classId.split('/').pop() })
                                    }}>Remove teacher</Button></td>
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
                            <tr><td>Id</td><td>Name</td><td>Number</td><td>Email</td><td>Admin</td></tr>
                            {props.teachers.map(t => (
                                <tr key={t.id}><td><Link to={'/teachers/' + t.id}>{t.id}</Link></td><td>{t.name}</td><td>{t.number}</td><td>{t.email}</td><td>{t.admin.toString()}</td>
                                    <td><Button type="button" onClick={() => RemoveTeacher({ id: t.id })}>Delete</Button></td>
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
            <span>Teacher table contains no elements. </span>
        </div>
    )
}