const React = require('react')
import {Link} from 'react-router-dom'
import {Button, Table} from 'react-bootstrap'

import RemoveKlass from './KlassRemove'

export default (props) => {
    if (props.containsData) {
        return (
            <div>
                <Table>
                    <tbody>
                        <tr><th>Id</th><th>Identifier</th><th>Auto enrolment</th></tr>
                        {props.klasses.map(k => (
                            <tr key={k.id}><td><Link to={'/classes/' + k.id}>{k.id}</Link></td><td>{k.identifier}</td><td>{k.enrolment.toString()}</td>
                                <td><Button type="button" onClick={() => RemoveKlass({ id: k.id })}>Remove</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }

    else return (
        <div>
            <span>Class table contains no elements. </span>
        </div>
    )
}

                            //onClick={() => RemoveStudent({id: s.id})} binds the function to corresponding <tr>
