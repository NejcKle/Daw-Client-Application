const fetch = require('isomorphic-fetch')
import * as GroupActions from '../Actions/GroupActions'

export default (props) => {
    var myHeaders = new Headers();

    var authorizationBasic = btoa("admin:admin");

    myHeaders.append('Authorization', 'Basic ' + authorizationBasic);
    myHeaders.append('Content-Type', 'application/vnd.siren+json');

    //object containing data passed from form
    var group = { name: props.name, students_limit: props.students_limit, id: props.g_id };

    var data = JSON.stringify(
        group
    )

    var myInit = {
        method: 'POST',
        headers: myHeaders,
        body: data
    };

    var myRequest = new Request('http://localhost:8080/groups/', myInit)

    fetch(myRequest)
        .then(
        function (response) {
            if (response.ok) {
                //console.log("adding");
                GroupActions.addGroup();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
}
