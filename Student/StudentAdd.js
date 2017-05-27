const fetch = require('isomorphic-fetch')
import * as StudentActions from '../Actions/StudentActions'

export default (props) => {
    var myHeaders = new Headers();
    var authorizationBasic = btoa("admin:admin");

    myHeaders.append('Authorization', 'Basic ' + authorizationBasic);
    myHeaders.append('Content-Type', 'application/vnd.siren+json');

    //object containing data passed from form
    var student = { name: props.name, email: props.email, number: props.number, id: props.s_id };
    var data = JSON.stringify(student)
    var myInit = {
        method: 'POST',
        headers: myHeaders,
        body: data
    };

    var myRequest = new Request('http://localhost:8080/students/', myInit)

    fetch(myRequest)
        .then(
        function (response) {
            if (response.ok) {
                //console.log("adding");
                StudentActions.addStudent();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
}
