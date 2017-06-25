import TeacherDisplay from '../Teacher/TeacherDisplay'
import TeacherForm from '../Teacher/TeacherForm'
import { Link } from 'react-router-dom'
const React = require('react')

var courseClassLinksArray = [];

export default class TeacherDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containsData: false,
            name: '',
            number: '',
            email: '',
            id: '',
            admin: '',
            courses_id: [],
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

        fetch('http://localhost:8080' + location)
            .then(
            (response) => {
                if (response.status === 404) {
                    window.alert("No teachers in database");
                    this.setState({ containsData: false });
                }
                else if (response.status === 200) {
                    this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
                            //console.log(obj);
                            //console.log(obj.entities.length);
                            this.setState({ name: obj.properties.name });
                            this.setState({ id: obj.properties.id });
                            this.setState({ number: obj.properties.number });
                            this.setState({ email: obj.properties.email });
                            this.setState({ admin: obj.properties.admin });
                            var courseArray = [];
                            courseClassLinksArray = [];
                            //console.log(obj.entities.length);
                            for (var i = 0; i < obj.entities.length; i++) {
                                //console.log(obj.entities[i].title);
                                if (obj.entities[i].title === "class") {
                                    var className = obj.entities[i].links[0].href.split('/').pop();
                                    //console.log(className);
                                    this.fetchCourseClassConnection(className);
                                    //console.log(courseClassLinksArray);
                                }
                                if (obj.entities[i].title === "course") {
                                    courseArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }
                            }
                            this.setState({ courses_id: courseArray });
                            /*-setTimeout(() => {
                                this.setState({ courseClassLinks: courseClassLinksArray });
                            }, 50)*/
                        }
                    );
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
                    //window.alert("Class not in database");
                    //this.setState({ containsData: false });
                }
                else if (response.status === 200) {
                    //this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
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
        if (this.props.admin === true) {
            return (
                <div>
                    <h1> Teacher Detail </h1>
                    <TeacherDisplay name={this.state.name} id={this.state.id} number={this.state.number} email={this.state.email} admin={this.state.admin} klasses_id={this.state.courseClassLinks} courses_id={this.state.courses_id} containsData={this.state.containsData}/>
                    <TeacherForm />
                </div>
            )
        }

        else {
            return (
                <div>
                    <TeacherDisplay name={this.state.name} id={this.state.id} number={this.state.number} email={this.state.email} admin={this.state.admin} klasses_id={this.state.courseClassLinks} courses_id={this.state.courses_id} containsData={this.state.containsData} />
                </div>
            );
        }
    }
}