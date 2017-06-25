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
    //console.log('http://localhost:8080/courses' + course_id + '/' + props.k_id);
    var conRequest = new Request('http://localhost:8080/courses' + course_id + '/' + props.k_id, connect);
    var con2Request = new Request('http://localhost:8080/semesters/' + props.sem_id +'/' + props.k_id, connect);
    var con3Request = new Request('http://localhost:8080/teachers/ucitelj/classes/' + props.k_id, connect);
    //var con4Request = new Request('http://localhost:8080/students/' + 'user1/' + props.k_id, connect);

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

   fetch(conRequest)
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
        })

       fetch(con2Request)
        .then(
        function (response) {
            if (response.ok) {
                console.log("semester added to this course.");
                KlassActions.connectKlass();
                CourseActions.addCourse();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })

      fetch(con3Request)
        .then(
        function (response) {
            if (response.ok) {
                //console.log("Class added to this course.");
                KlassActions.connectKlass();
                CourseActions.addCourse();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
/*
        setTimeout(() => {fetch(con4Request)
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
        })}, 400)*/
}
