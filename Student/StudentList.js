const React = require('react')
const fetch = require('isomorphic-fetch')
import Student from './Student'
import DisplayStudents from './StudentsDisplay'
import StudentStore from './StudentStore'

export default class StudentList extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);

        this.state = {
            students: [],
            containsData: false,
            connectedStudents: [],
            notConnectedStudents: []
        }
    }

    fetchData() {
        fetch('http://localhost:8080/students/')
            .then(
            (response) => {
                if (response.status === 404) {
                    //console.log(response.status);
                    //window.alert("No students in database");
                    this.setState({ containsData: false });
                }

                else if (response.status === 200) {
                    this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
                            var numOfStudents = obj.entities.length;
                            var studentArray = [];
                            for (var i = 0; i < numOfStudents; i++) {
                                let StudentTemp = new Student(obj.entities[i].properties.name, obj.entities[i].properties.number, obj.entities[i].properties.email, obj.entities[i].properties.id);
                                studentArray.push(StudentTemp);
                            }
                            this.setState({ students: studentArray });
                            setTimeout(() => {
                                var connectedStudentsArray = [];
                                var notConnectedStudentsArray = [];

                                for (var j = 0; j < numOfStudents; j++) {
                                    var added = false;
                                    //console.log(this.props.connectedStudents);
                                    for (var k = 0; k < this.props.connectedStudents.length; k++) {
                                        //console.log(this.props.connectedStudents);
                                        if (this.props.connectedStudents[k] === this.state.students[j].id) {

                                            if (connectedStudentsArray.indexOf(this.state.students[j]) < 0) {
                                                //console.log(this.state.students[j].id);
                                                connectedStudentsArray.push(this.state.students[j]);
                                                added = true;
                                            }
                                        }


                                    }
                                    if (!added) {
                                        //console.log(this.state.teachers[j].id);
                                        notConnectedStudentsArray.push(this.state.students[j]);
                                    }

                                }
                                this.setState({ connectedStudents: connectedStudentsArray, notConnectedStudents: notConnectedStudentsArray });
                            }, 500);
                        });
                }
            }
            )
            .catch(function (err) {
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
                <h2> Student List </h2>
                <DisplayStudents students={this.state.students} containsData={this.state.containsData} classId={this.props.classId} connectedStudents={this.state.connectedStudents} notConnectedStudents={this.state.notConnectedStudents} />
            </div>
        )
    }
}
