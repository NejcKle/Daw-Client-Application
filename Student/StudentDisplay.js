const React = require('react')
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

export default (props) => {
    if (props.containsData) {
        if (props.klasses_id.length > 0) {
            return (
                <div>
                    <Table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Number</th><th>Email</th><th colSpan={props.klasses_id.length}>Enroled class</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.number}</td><td>{props.email}</td>
                                {props.klasses_id.map(klass => (
                                    <td key={klass}>
                                        <Link to={klass}>{klass.split('/').pop()}</Link>
                                    </td>
                                ))}
                            </tr>
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
                            <tr><th>Id</th><th>Name</th><th>Number</th><th>Email</th><th>Enroled class</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.number}</td><td>{props.email}</td><td>/</td></tr>
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    else
        return (
            <div>
                <span><Link to='/'>Student does not exist!</Link></span>

            </div>
        )
}