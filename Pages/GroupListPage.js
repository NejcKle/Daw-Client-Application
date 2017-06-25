const React = require('react')
import GroupList from '../Group/GroupList'
import GroupForm from '../Group/GroupForm'

export default (props) => {
    if (props.admin === true) {
        return(
            <div>
                <GroupList admin={props.admin} />
                <GroupForm />
            </div>
        )
    }
    else {
        return (
            <div>
                <GroupList />
            </div>
        )
    }
}