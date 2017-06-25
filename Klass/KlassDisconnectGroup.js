const fetch = require('isomorphic-fetch')

import * as KlassActions from '../Actions/KlassActions'
import * as GroupActions from '../Actions/GroupActions'

export default (props) => {

    var myHeaders = new Headers();
    var authorizationBasic = btoa("admin:admin");

    myHeaders.append('Authorization', 'Basic ' + authorizationBasic);
    myHeaders.append('Content-Type', 'application/vnd.siren+json');

    var myInit = {
        method: 'DELETE',
        headers: myHeaders
    };

    var class_id = props.classId;

    //console.log(props);
   var myRequest = new Request('http://localhost:8080/classes/' + class_id + '/' + props.groupId, myInit)

    fetch(myRequest)
        .then(
        function (response) {
            if (response.ok) {
                //console.log("group disconnected from this class");
                KlassActions.disconnectKlass();
                GroupActions.addGroup();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
}