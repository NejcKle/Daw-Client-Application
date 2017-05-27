const React = require('react')

export default (props) => (
    <div>
        <table>
                <tbody>
                    <tr><td>Name</td><td>Acronim</td><td>Id</td></tr>
                    {props.courses.map(s => (
                            <tr><td>{s.name}</td><td>{s.acronim}</td><td>{s.id}</td></tr>
                    ))}
                </tbody>
        </table>
    </div>
)
