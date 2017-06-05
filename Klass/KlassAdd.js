const fetch = require('isomorphic-fetch')
import * as KlassActions from '../Actions/KlassActions'
import * as CourseActions from '../Actions/CourseActions'

export default (props) => {
    var myHeaders = new Headers();
    var authorizationBasic = btoa("admin:admin");

    myHeaders.append('Authorization', 'Basic ' + authorizationBasic);
    myHeaders.append('Content-Type', 'application/vnd.siren+json');

    //object containing data passed from form
    var klass = { identifier: props.identifier, enrolment: props.enrolment, id: props.k_id };
    var data = JSON.stringify(klass)
    var myInit = {
        method: 'POST',
        headers: myHeaders,
        body: data
    };
    var connect = {
        method: 'POST',
        headers: myHeaders
    };

    var myRequest = new Request('http://localhost:8080/classes/', myInit);
    var url = document.URL;
    var course_id = url.substring(url.lastIndexOf('/'));
    console.log("Course ID: " + course_id);
    var conRequest = new Request('http://localhost:8080/courses' + course_id + '/' + props.k_id, connect);
    //var con2Request = new Request('http://localhost:8080/teachers/' + props.teacherId + '/classes/' + props.k_id, connect);

    fetch(myRequest)
        .then(
        function (response) {
            if (response.ok) {
                //console.log("adding");
                KlassActions.addKlass();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
    setTimeout(() => {fetch(conRequest)
        .then(
        function (response) {
            if (response.ok) {
                console.log("Class added to this course.");
                KlassActions.connectKlass();
                CourseActions.addCourse();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })}, 100)
}
