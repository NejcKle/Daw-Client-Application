const fetch = require('isomorphic-fetch')

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
    var teacherInit = {
        method: 'POST',
        headers: myHeaders
    }

    var myRequest = new Request('http://localhost:8080/courses', myInit)
    var teacherRequest = new Request('http://localhost:8080/teachers/e123/' + course.id, teacherInit)

    fetch(myRequest)
    .then(
        function(response) {
            if(response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        }
    )
    .catch(function(err) {
        console.log('Fetch error :-S', err);
    })

    fetch(teacherRequest)
    .then(
        function(response) {
            if(response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        }
    )
    .catch(function(err) {
        console.log('Fetch error :-S', err);
    })
}