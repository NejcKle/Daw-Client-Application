const fetch = require('isomorphic-fetch')
import * as KlassActions from '../Actions/KlassActions'

export default (props) => {
    var myHeaders = new Headers();

    var authorizationBasic = btoa("admin:admin");

    myHeaders.append('Authorization', 'Basic ' + authorizationBasic);
    myHeaders.append('Content-Type', 'application/vnd.siren+json');

    var myInit = {
        method: 'DELETE',
        headers: myHeaders,
    };

    var uri = 'http://localhost:8080/classes/' + props.id;
    var myRequest = new Request(uri, myInit)

    fetch(myRequest)
      .then(
        function(response) {
            if (response.ok) {
                //console.log("remove");
                KlassActions.removeKlass();
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      })

}
