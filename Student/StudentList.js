const React = require('react')
const fetch = require('isomorphic-fetch')
import Student from './Student'
import DisplayStudents from './StudentDisplay'
import StudentStore from './StudentStore'

export default class StudentList extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            students: []
        }
    }

    fetchData() {
        fetch('http://localhost:8080/students/')
          .then(
            (response) => {
              response.text()
                  .then((data) => {
                    var obj = JSON.parse(data);
                    var numOfStudents = obj.entities.length;
                    var studentArray = [];
                    for(var i = 0; i < numOfStudents; i++) {
                        let StudentTemp = new Student(obj.entities[i].properties.name, obj.entities[i].properties.number, obj.entities[i].properties.email, obj.entities[i].properties.id);
                        studentArray.push(StudentTemp);
                    }
                      this.setState({students: studentArray});
                   });
              }
          )
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          })
    }

    componentDidMount() {
        StudentStore.on("change", this.fetchData);
    }

    componentWillMount() {
        this.fetchData();
    }

    render() {
    return (
            <div>
                <DisplayStudents students={this.state.students} />
            </div>
    )}
}
