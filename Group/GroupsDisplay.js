const React = require('react')

import RemoveGroup from './GroupRemove'

export default (props) => {
    if (props.containsData) {
        return (
            <div>
                <table>
                    <tbody>
                        <tr><td>Id</td><td>name</td><td>Students limit</td></tr>
                        {props.groups.map(g => (
                            <tr key={g.id}><td><a href={'/groups/' + g.id}>{g.id}</a></td><td>{g.name}</td><td>{g.students_limit}</td>
                                <td><button type="button" onClick={() => RemoveGroup({ id: g.id })}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    else return (
        <div>
            <span>Group table contains no elements </span>
        </div>
    )
}

                            //onClick={() => RemoveStudent({id: s.id})} binds the function to corresponding <tr>
