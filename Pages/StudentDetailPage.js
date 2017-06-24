import StudentDisplay from '../Student/StudentDisplay'
import StudentForm from '../Student/StudentForm'

import { Link } from 'react-router-dom'
const React = require('react')

export default class StudentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containsData: false,
            name: '',
            number: '',
            id: '',
            email: '',
            klasses_id: [],
            courseClassLinks: []
        }
        this.fetchCourseClassConnection = this.fetchCourseClassConnection.bind(this);
    }

    componentWillMount() {
        var location;
        if (this.props.location.pathname !== '') {
            location = this.props.location.pathname;
        }
        else location = window.location.pathname;
        //console.log(location);
        fetch('http://localhost:8080' + location)
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
                            //console.log(obj.entities.length);
                            this.setState({ name: obj.properties.name });
                            this.setState({ id: obj.properties.id });
                            this.setState({ number: obj.properties.number });
                            this.setState({ email: obj.properties.email });
                            var klassArray = [];
                            //console.log(obj.entities.length);
                            for (var i = 0; i < obj.entities.length; i++) {
                                var className = obj.entities[i].links[0].href.split('/').pop();
                                klassArray.push(className);
                                setTimeout(() => {
                                    this.fetchCourseClassConnection(className);
                                }, 50);
                            }
                            this.setState({ klasses_id: klassArray });
                            //console.log(obj.entities[0].links[0].href.split('/').pop()); --> extracts id of class
                        });
                }
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
    }

     fetchCourseClassConnection(className) {
       //console.log(className);
        fetch('http://localhost:8080/classes/' + className)
            .then(
            (response) => {
                if (response.status === 404) {
                    window.alert("No teachers in database");
                    //this.setState({ containsData: false });
                }

                else if (response.status === 200) {
                    //this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
                            var courseClassLinksArray = [];
                            for (var i = 0; i < obj.entities.length; i++) {
                                if (obj.entities[i].title === "course") {
                                    //console.log(obj.entities[i].properties.name);
                                    courseClassLinksArray.push('/courses/' + obj.entities[i].properties.name + '/' + className );
                                }
                            }
                            setTimeout(() => {
                                 this.setState({courseClassLinks: courseClassLinksArray});
                            }, 5);
                        }
                    )
                }
            }
        )             
    }

    render() {
        if (this.state.containsData && this.props.admin === true) {
            return (
                <div>
                    <h1>Student Detail</h1>
                    <StudentDisplay name={this.state.name} id={this.state.id} number={this.state.number} email={this.state.email} klasses_id={this.state.courseClassLinks} containsData={this.state.containsData} />
                    <StudentForm />
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>Student Detail</h1>
                    <StudentDisplay name={this.state.name} id={this.state.id} number={this.state.number} email={this.state.email} klasses_id={this.state.courseClassLinks} containsData={this.state.containsData} />
                </div>
            );
        }
    }
}

