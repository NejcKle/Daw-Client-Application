const React = require('react')

export default (props) => (
    <div>
        <table>
                <tbody>
                    <tr><td>Name</td><td>Number</td><td>Email</td><td>Id</td></tr>
                    {props.students.map(s => (
                            <tr><td>{s.name}</td><td>{s.number}</td><td>{s.email}</td><td>{s.id}</td></tr>
                    ))}
                </tbody>
        </table>
    </div>
)
