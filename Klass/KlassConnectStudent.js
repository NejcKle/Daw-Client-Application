const fetch = require('isomorphic-fetch')

import * as KlassActions from '../Actions/KlassActions'
import * as StudentActions from '../Actions/StudentActions'

export default (props) => {

    var myHeaders = new Headers();
    var authorizationBasic = btoa("admin:admin");

    myHeaders.append('Authorization', 'Basic ' + authorizationBasic);
    myHeaders.append('Content-Type', 'application/vnd.siren+json');

    var myInit = {
        method: 'POST',
        headers: myHeaders
    };

    var class_id = props.classId;
    //console.log(props.teacherId + " " + class_id);

    //console.log(props);
    var myRequest = new Request('http://localhost:8080/students/' + props.studentId + '/' + class_id, myInit)

    fetch(myRequest)
        .then(
        function (response) {
            if (response.ok) {
                //console.log("student connected with class");
                KlassActions.connectKlass();
                StudentActions.addStudent();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
}
