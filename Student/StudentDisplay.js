const React = require('react')
import RemoveStudent from './StudentRemove'

export default (props) => {
    if (props.containsData) {
        return(
        <div>
            <table>
                    <tbody>
                        <tr><td>Name</td><td>Number</td><td>Email</td><td>Id</td></tr>
                        {props.students.map(s => (
                                <tr key={s.id}><td>{s.name}</td><td>{s.number}</td><td>{s.email}</td><td>{s.id}</td>
                                <td><button type="button" onClick={() => RemoveStudent({id: s.id})}>Remove</button></td>
                                </tr>
                        ))}
                    </tbody>
            </table>
        </div>
                    )
    }

    else return (
    <div>
        <span>Student table contains no elements </span>
    </div>
    )
}

                            //onClick={() => RemoveStudent({id: s.id})} binds the function to corresponding <tr>
