const React = require('react')
const fetch = require('isomorphic-fetch')
import Student from './Student'
import DisplayStudents from './StudentDisplay'

export default class StudentList extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
        students: []
    }
  }

    componentDidMount() {
    fetch('http://localhost:8080/students/')
      .then(
        (response) => {
          // Examine the text in the response
          response.text()
              .then((data) => {
                  //console.log(data);
                  var obj = JSON.parse(data);
                //console.log(obj);
                    var numOfStudents = obj.entities.length;
              //console.log(numOfStudents);
                var studentArray = [];
                for(var i = 0; i < numOfStudents; i++) {
                    let StudentTemp = new Student(obj.entities[i].properties.name, obj.entities[i].properties.number, obj.entities[i].properties.email, obj.entities[i].properties.id);
                    //console.log(StudentTemp);
                    studentArray.push(StudentTemp);
                }

                  this.setState({students: studentArray});
                //console.log(this.state.students);
               });
          }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      })
  }

    render() {
        return (
            <DisplayStudents students={this.state.students} />
    )}
}
