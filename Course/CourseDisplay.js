const React = require('react')
import { Link } from 'react-router-dom'

export default (props) => {
    if (props.containsData) {
<<<<<<< HEAD
        console.log(props.teacher_id);
=======
>>>>>>> de6dd6220b723ed06920e1e777ee2f5d298b6035
        return (
            <div>
                <table>
                    <tbody>
<<<<<<< HEAD
                        <tr><th>Id</th><th>Name</th><th>Acronim</th><th>Responsible teacher</th></tr>
                        <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.acronim}</td><td>{(props.teacher_id !== '') ? (<Link to={'/teachers/' + props.teacher_id}>{props.teacher_id}</Link>) : '/'}</td></tr>
=======
                        <tr><th>Id</th><th>Name</th><th>Acronim</th><th>Responsible teacher</th><th colSpan={props.classes_id.length}>Classes</th></tr>
                        <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.acronim}</td>
                            {(props.teacher_id.length > 0) ?
                                <td><Link to={'/teachers/' + props.teacher_id}>{props.teacher_id}</Link></td>
                             : "/"}
                            {(props.classes_id.length > 0) ? (props.classes_id.map(klass => (
                                <td key={klass}><Link to={'/classes/' + klass}>{klass}</Link>
                                </td>
                            ))) : "/"}
                        </tr>
>>>>>>> de6dd6220b723ed06920e1e777ee2f5d298b6035
                    </tbody>
                </table>
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
