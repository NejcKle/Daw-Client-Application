const React = require('react')
import { Link } from 'react-router-dom'

export default (props) => {
    console.log(props);
    if (props.containsData) {
        console.log(props.teacher_id);
        return (
            <div>
                <table>
                    <tbody>
                        <tr><th>Id</th><th>Name</th><th>Acronim</th><th>Responsible teacher</th></tr>
                        <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.acronim}</td><td>{(props.teacher_id !== '') ? (<Link to={'/teachers/' + props.teacher_id}>{props.teacher_id}</Link>) : '/'}</td></tr>
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
