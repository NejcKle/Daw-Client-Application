const fetch = require('isomorphic-fetch')

import * as GroupActions from '../Actions/GroupActions'
import * as StudentActions from '../Actions/StudentActions'

export default (props) => {

    var myHeaders = new Headers();
    var authorizationBasic = btoa("admin:admin");

    myHeaders.append('Authorization', 'Basic ' + authorizationBasic);
    myHeaders.append('Content-Type', 'application/vnd.siren+json');

    var myInit = {
        method: 'DELETE',
        headers: myHeaders
    };

    var myRequest = new Request('http://localhost:8080/groups/' + props.groupId +'/' + props.studentId, myInit)

    fetch(myRequest)
        .then(
        function (response) {
            if (response.ok) {
                //console.log("student left the group");
                GroupActions.disconnectGroup();
                StudentActions.removeStudent();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
}