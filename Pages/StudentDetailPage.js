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
            klasses_id: []
        }
    }

    componentWillMount() {
        fetch('http://localhost:8080' + this.props.location.pathname)
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
                                klassArray.push(obj.entities[i].links[0].href.split('/').pop());
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

    render() {
        if (this.state.containsData) {
            return (
                <div>
                    <h1>Student Detail</h1>
                    <StudentDisplay name={this.state.name} id={this.state.id} number={this.state.number} email={this.state.email} klasses_id={this.state.klasses_id} containsData={this.state.containsData} />
                    <StudentForm />
                    <br/>
                    <Link to='/courses/'>All courses list</Link>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>Student Detail</h1>
                    <StudentDisplay name={this.state.name} id={this.state.id} number={this.state.number} email={this.state.email} klasses_id={this.state.klasses_id} containsData={this.state.containsData} />
                    <br/>
                    <Link to='/courses/'>All courses list</Link>
                </div>
            );
        }
    }
}

