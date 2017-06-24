const React = require('react')
import {Link} from 'react-router-dom'
import {Button, Table} from 'react-bootstrap'

import RemoveKlass from './KlassRemove'

export default (props) => {
    if (props.containsData) {
        console.log("ALO " + props.klasses_links);
        return (
            <div>
                <Table>
                    <tbody>
                        <tr><th>Id</th><th>Identifier</th><th>Auto enrolment</th></tr>
                        {props.klasses.map(k => (
                            <tr key={k.id}><td><Link to={props.klasses_links.toString()}>{k.id}</Link></td><td>{k.identifier}</td><td>{k.enrolment.toString()}</td>
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
            <span>Class table contains no elements.</span>
        </div>
    )
}