const React = require('react')
import { Link } from 'react-router-dom'

export default (props) => {
    if (props.containsData) {
        //console.log(props.klasses_id + props.courses_id);
        if (props.klasses_id.length > 0 && props.courses_id.length > 0) {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Number</th><th>Email</th><th colSpan={props.klasses_id.length}>Classes</th><th colSpan={props.courses_id.length}>Courses</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.number}</td><td>{props.email}</td>
                                {props.klasses_id.map(klass => (
                                    <td key={klass}>
                                        <Link to={'/classes/' + klass}>{klass}</Link>
                                    </td>
                                ))}
                                {props.courses_id.map(course => (
                                    <td key={course}>
                                        <Link to={'/courses/' + course}>{course}</Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }

        else if (props.klasses_id.length > 0) {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Number</th><th>Email</th><th colSpan={props.klasses_id.length}>Classes</th><th colSpan={props.courses_id.length}>Courses</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.number}</td><td>{props.email}</td>
                                {props.klasses_id.map(klass => (
                                    <td key={klass}>
                                        <Link to={'/classes/' + klass}>{klass}</Link>
                                    </td>
                                ))}
                                <td>/</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }

        else if (props.courses_id.length > 0) {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr><th>Id</th><th>Name</th><th>Number</th><th>Email</th><th colSpan={props.klasses_id.length}>Classes</th><th colSpan={props.courses_id.length}>Courses</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.number}</td><td>{props.email}</td>
                                <td>/</td>
                                {props.courses_id.map(course => (
                                    <td key={course}>
                                        <Link to={'/courses/' + course}>{course}</Link>
                                    </td>
                                ))}
                            </tr>
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
                            <tr><th>Id</th><th>Name</th><th>Number</th><th>Email</th><th>Classes</th><th>Courses</th></tr>
                            <tr key={props.id}><td>{props.id}</td><td>{props.name}</td><td>{props.number}</td><td>{props.email}</td><td>/</td><td>/</td></tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    else return (
        <div>
            <span>No data available!</span>
        </div>
    )
}