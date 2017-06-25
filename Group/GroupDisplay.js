const React = require('react')
import { Link } from 'react-router-dom'
import {Button, Table} from 'react-bootstrap'

import GroupConnectStudent from './GroupConnectStudent'
import GroupDisconnectStudent from './GroupDisconnectStudent'

export default (props) => {
    if (props.containsData) {
        if (props.students_id.length > 0 && props.klass_id !== '') {
             return (
                <div>
                    <Table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Students limit</th><th>Class</th><th colSpan={props.students_id.length}>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.students_limit}</td><td><Link to={props.klass_id}>{props.klass_id.substring(props.klass_id.lastIndexOf('/')+1)}</Link></td>
                                {props.students_id.map(student => (
                                    <td key={student}><Link to={'/students/' + student}>{student}</Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                    <br/>
                    {(props.username != 'admin') 
                    ?(
                        (props.students_id.indexOf(props.username) > 0) 
                            ?<td><Button type="button" onClick={() => {GroupDisconnectStudent({ studentId: props.username, groupId: props.id })}}>Leave group</Button></td>
                            :<td><Button type="button" onClick={() => {GroupConnectStudent({ studentId: props.username, groupId: props.id })}}>Enter group</Button></td>
                    )
                    : <br/>
                    }
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
                    <br/>
                    {(props.username != 'admin') 
                    ?(
                        (props.students_id.indexOf(props.username) > 0) 
                            ?<td><Button type="button" onClick={() => {GroupDisconnectStudent({ studentId: props.username, groupId: props.id })}}>Leave group</Button></td>
                            :<td><Button type="button" onClick={() => {GroupConnectStudent({ studentId: props.username, groupId: props.id })}}>Enter group</Button></td>
                    )
                    : <br/>
                    }
                </div>
            )
        }
        else if (props.klass_id !== '') {
            return (
                <div>
                    <Table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Students limit</th><th>Class</th><th colSpan={props.students_id.length}>Students</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.students_limit}</td><td><Link to={props.klass_id}>{props.klass_id.split('/').pop()}</Link></td><td>/</td></tr>
                        </tbody>
                    </Table>
                    <br/>
                    {(props.username != 'admin') 
                    ?(
                        (props.students_id.indexOf(props.username) > 0) 
                            ?<td><Button type="button" onClick={() => {GroupDisconnectStudent({ studentId: props.username, groupId: props.id })}}>Leave group</Button></td>
                            :<td><Button type="button" onClick={() => {GroupConnectStudent({ studentId: props.username, groupId: props.id })}}>Enter group</Button></td>
                    )
                    : <br/>
                    }
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
                    <br/>
                    {(props.username != 'admin') 
                    ?(
                        (props.students_id.indexOf(props.username) > 0) 
                            ?<td><Button type="button" onClick={() => {GroupDisconnectStudent({ studentId: props.username, groupId: props.id })}}>Leave group</Button></td>
                            :<td><Button type="button" onClick={() => {GroupConnectStudent({ studentId: props.username, groupId: props.id })}}>Enter group</Button></td>
                    )
                    : <br/>
                    }
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