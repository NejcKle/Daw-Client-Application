const fetch = require('isomorphic-fetch')
import * as CourseActions from '../Actions/CourseActions'

export default (props) => {
    var myHeaders = new Headers();
    var authorizationBasic = btoa("admin:admin");

    myHeaders.append('Authorization', 'Basic ' + authorizationBasic);
    myHeaders.append('Content-Type', 'application/vnd.siren+json');

    var course = {name: props.name, acronim:props.acronim, id:props.c_id};
    var data = JSON.stringify(course)
    var myInit = {
        method: 'POST',
        headers: myHeaders,
        body: data
    };

    var myRequest = new Request('http://localhost:8080/courses', myInit)

    fetch(myRequest)
    .then(
        function(response) {
            if(response.ok) {
                CourseActions.addCourse();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        }
    )
    .catch(function(err) {
        console.log('Fetch error :-S', err);
    })
}