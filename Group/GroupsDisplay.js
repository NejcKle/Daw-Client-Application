const React = require('react')
import { Link } from 'react-router-dom'

import RemoveGroup from './GroupRemove'
import KlassConnectGroup from '../Klass/KlassConnectGroup'
import KlassDisconnectGroup from '../Klass/KlassDisconnectGroup'

export default (props) => {
    if (props.containsData) {
        var url = document.URL;
        if (url.includes('/classes/')) {
             return (
                <div>
                    <table>
                        <tbody>
                            <tr><td>Id</td><td>name</td><td>Students limit</td></tr>
                            {props.notConnectedGroups.map(g => (
                                <tr key={g.id}><td><Link to={'/groups/' + g.id}>{g.id}</Link></td><td>{g.name}</td><td>{g.students_limit}</td>
                                    <td><button type="button" onClick={() => {
                                        KlassConnectGroup({ groupId: g.id, classId: props.classId })
                                    }}>Add group</button></td>
                                </tr>
                            ))}
                            {props.connectedGroups.map(g => (
                                <tr key={g.id}><td><Link to={'/groups/' + g.id}>{g.id}</Link></td><td>{g.name}</td><td>{g.students_limit}</td>
                                    <td><button type="button" onClick={() => {
                                        KlassDisconnectGroup({ groupId: g.id, classId: props.classId })
                                    }}>Remove group</button></td>
                                </tr>
                            ))}
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
                            <tr><td>Id</td><td>name</td><td>Students limit</td></tr>
                            {props.groups.map(g => (
                                <tr key={g.id}><td><Link to={'/groups/' + g.id}>{g.id}</Link></td><td>{g.name}</td><td>{g.students_limit}</td>
                                    <td><button type="button" onClick={() => RemoveGroup({ id: g.id })}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
