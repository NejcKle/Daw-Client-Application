const React = require('react')
import { Link } from 'react-router-dom'

import RemoveGroup from './GroupRemove'
import KlassConnectGroup from '../Klass/KlassConnectGroup'
import KlassDisconnectGroup from '../Klass/KlassDisconnectGroup'
import {Button, Table} from 'react-bootstrap'

export default (props) => {
    if (props.containsData) {
        var url = document.URL;
        if (url.includes('/classes/')) {
             return (
                <div>
                    <Table>
                        <tbody>
                            <tr><td>Id</td><td>name</td><td>Students limit</td></tr>
                            {props.notConnectedGroups.map(g => (
                                <tr key={g.id}><td><Link to={'/groups/' + g.id}>{g.id}</Link></td><td>{g.name}</td><td>{g.students_limit}</td>
                                    <td><Button type="button" onClick={() => {
                                        KlassConnectGroup({ groupId: g.id, classId: props.classId })
                                    }}>Add group</Button></td>
                                </tr>
                            ))}
                            {props.connectedGroups.map(g => (
                                <tr key={g.id}><td><Link to={'/groups/' + g.id}>{g.id}</Link></td><td>{g.name}</td><td>{g.students_limit}</td>
                                    <td><Button type="button" onClick={() => {
                                        KlassDisconnectGroup({ groupId: g.id, classId: props.classId })
                                    }}>Remove group</Button></td>
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
                            <tr><td>Id</td><td>name</td><td>Students limit</td></tr>
                            {props.groups.map(g => (
                                <tr key={g.id}><td><Link to={'/groups/' + g.id}>{g.id}</Link></td><td>{g.name}</td><td>{g.students_limit}</td>
                                    <td><Button type="button" onClick={() => RemoveGroup({ id: g.id })}>Remove</Button></td>
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
            <span>Group table contains no elements </span>
        </div>
    )
}

                            //onClick={() => RemoveStudent({id: s.id})} binds the function to corresponding <tr>
