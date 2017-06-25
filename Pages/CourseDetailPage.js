const React = require('react')
import { Link } from 'react-router-dom'

import CourseDisplay from '../Course/CourseDisplay'
import KlassForm from '../Klass/KlassForm'
import CourseStore from '../Course/CourseStore'

export default class CourseDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containsData: false,
            name: '',
            acronim: '',
            id: '',
            teacher_id: '',
            classes_id: []
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    componentDidMount() {
        CourseStore.on("change", this.fetchData);
    }

    fetchData() {
        //console.log(window.location.pathname);
        fetch('http://localhost:8080' + window.location.pathname)
            .then(
            (response) => {
                //console.log(response);
                if (response.status === 404) {
                    this.setState({ containsData: false });
                }
                else if (response.status === 200) {
                    this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
                            //console.log(obj);
                            this.setState({ name: obj.properties.name });
                            this.setState({ id: obj.properties.id });
                            this.setState({ acronim: obj.properties.acronim });
                            var teacher;
                            var klassArray = [];
                            for (var i = 0; i < obj.entities.length; i++) {
                                //console.log(obj.entities[i].title);
                                if (obj.entities[i].title === "teacher") {
                                    teacher = obj.entities[i].links[0].href.split('/').pop();
                                }
                                if (obj.entities[i].title === "class") {
                                    klassArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }
                            }
                            //console.log(klassArray);
                            setTimeout(() => {
                            this.setState({ teacher_id: teacher });
                            this.setState({ classes_id: klassArray });
                            }, 5);
                            //console.log(obj.entities[0].links[0].href.split('/').pop()); --> extracts id of class
                        });
                }
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
    }

    render() {
        if (this.state.containsData && this.props.loggedIn) {
            if (this.props.admin === true) {
                return (
                    <div>
                        <h1> Course Detail </h1>
                        <CourseDisplay name={this.state.name} id={this.state.id} acronim={this.state.acronim} containsData={this.state.containsData} teacher_id={this.state.teacher_id} classes_id={this.state.classes_id} loggedIn={this.props.loggedIn} />
                        <p>Create new class to this course:</p>
                        <KlassForm />
                        <Link to='/classes'>All classes list</Link>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h1> Course Detail </h1>
                        <CourseDisplay name={this.state.name} id={this.state.id} acronim={this.state.acronim} containsData={this.state.containsData} teacher_id={this.state.teacher_id} classes_id={this.state.classes_id} loggedIn={this.props.loggedIn} />
                        <Link to='/classes'>All classes list</Link>
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    <h1> Course Detail </h1>
                    <CourseDisplay name={this.state.name} id={this.state.id} acronim={this.state.acronim} containsData={this.state.containsData} teacher_id={this.state.teacher_id} classes_id={this.state.classes_id} loggedIn={this.props.loggedIn} />
                </div>
            )
        }
    }
}