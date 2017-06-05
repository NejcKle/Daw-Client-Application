const React = require('react')
import { Link } from 'react-router-dom'

import RemoveStudent from './StudentRemove'
import KlassConnectStudent from '../Klass/KlassConnectStudent'
import KlassDisconnectStudent from '../Klass/KlassDisconnectStudent'
import {Button, Table} from 'react-bootstrap'

export default (props) => {
    if (props.containsData) {
        var url = document.URL;
        if (url.includes('/classes/')) {
            return (
                <div>
                    <Table>
                        <tbody>
                            <tr><td>Id</td><td>Name</td><td>Number</td><td>Email</td></tr>
                            {props.notConnectedStudents.map(s => (
                                <tr key={s.id}><td><Link to={'/students/' + s.id}>{s.id}</Link></td><td>{s.name}</td><td>{s.number}</td><td>{s.email}</td>
                                    <td><Button type="button" onClick={() => {
                                        KlassConnectStudent({ studentId: s.id, classId: props.classId })
                                    }}>Add student</Button></td>
                                </tr>
                            ))}
                            {props.connectedStudents.map(s => (
                                <tr key={s.id}><td><Link to={'/students/' + s.id}>{s.id}</Link></td><td>{s.name}</td><td>{s.number}</td><td>{s.email}</td>
                                    <td><Button type="button" onClick={() => {
                                        KlassDisconnectStudent({ studentId: s.id, classId: props.classId })
                                    }}>Remove student</Button></td>
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
                            <tr><td>Id</td><td>Name</td><td>Number</td><td>Email</td></tr>
                            {props.students.map(s => (
                                <tr key={s.id}><td><Link to={'/students/' + s.id}>{s.id}</Link></td><td>{s.name}</td><td>{s.number}</td><td>{s.email}</td>
                                    <td><Button type="button" onClick={() => RemoveStudent({ id: s.id })}>Delete</Button></td>
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
            <span>Student table contains no elements. </span>
        </div>
    )
}

                            //onClick={() => RemoveStudent({id: s.id})} binds the function to corresponding <tr>
