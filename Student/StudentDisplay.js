const React = require('react')
import RemoveStudent from './StudentRemove'

export default (props) => (
    <div>
        <table>
                <tbody>
                    <tr><td>Name</td><td>Number</td><td>Email</td><td>Id</td></tr>
                    {props.students.map(s => (
                            <tr key={s.id}><td>{s.name}</td><td>{s.number}</td><td>{s.email}</td><td>{s.id}</td>
                            <td><button type="button" onClick={() => RemoveStudent({id: s.id})} /></td>
                            </tr>
                    ))}
                </tbody>
        </table>
    </div>
)

                            //onClick={() => RemoveStudent({id: s.id})} binds the function to corresponding <tr>
