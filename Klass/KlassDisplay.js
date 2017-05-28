const React = require('react')

import RemoveKlass from './KlassRemove'

export default (props) => {
    if (props.containsData) {
        return (
            <div>
                <table>
                    <tbody>
                        <tr><td>Id</td><td>Identifier</td><td>Auto enrolment</td></tr>
                        {props.klasses.map(k => (
                            <tr key={k.id}><td><a href={'/classes/' + k.id}>{k.id}</a></td><td>{k.identifier}</td><td>{k.enrolment.toString()}</td>
                                <td><button type="button" onClick={() => RemoveKlass({ id: k.id })}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    else return (
        <div>
            <span>Class table contains no elements </span>
        </div>
    )
}

                            //onClick={() => RemoveStudent({id: s.id})} binds the function to corresponding <tr>
