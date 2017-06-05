const React = require('react')
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

export default (props) => {
    if (props.containsData) {
        return (
            <div>
                <Table>
                    <tbody>
                        <tr><th>Id</th><th>Name</th><th>Acronim</th><th>Responsible teacher</th><th colSpan={props.classes_id.length}>Classes</th></tr>
                        <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.acronim}</td>
                            {(props.teacher_id.length > 0) ?
                                <td><Link to={'/teachers/' + props.teacher_id}>{props.teacher_id}</Link></td>
                             : <td>/</td>}
                            {(props.classes_id.length > 0) ? (props.classes_id.map(klass => (
                                <td key={klass}><Link to={'/classes/' + klass}>{klass}</Link>
                                </td>
                            ))) : <td>/</td>}
                        </tr>

                    </tbody>
                </Table>
            </div>
        )
    }
    else {
        return (
            <div>
                <span>No data about courses available!</span>
            </div>
        )
    }
}
