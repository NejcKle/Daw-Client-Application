import TeacherDisplay from '../Teacher/TeacherDisplay'
import TeacherForm from '../Teacher/TeacherForm'
const React = require('react')

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
            klasses_id: []
        }
    }

    componentWillMount() {
        //console.log(this.props.location.pathname);
        fetch('http://localhost:8080' + this.props.location.pathname)
            .then(
            (response) => {
                if (response.status === 404) {
                    //window.alert("No students in database");
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

                            var klassArray = [];
                            var courseArray = [];
                            //console.log(obj.entities.length);
                            for (var i = 0; i < obj.entities.length; i++) {
                                //console.log(obj.entities[i].title);
                                if (obj.entities[i].title === "class") {
                                    klassArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }

                                if (obj.entities[i].title === "course") {
                                    courseArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }
                            }

                            this.setState({ klasses_id: klassArray });
                            this.setState({ courses_id: courseArray });
                        });
                }
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    render() {
        return (
            <div>
                <h1> Teacher Detail </h1>
                <TeacherDisplay name={this.state.name} id={this.state.id} number={this.state.number} email={this.state.email} admin={this.state.admin} klasses_id={this.state.klasses_id} courses_id={this.state.courses_id} containsData={this.state.containsData} />
                <TeacherForm />
            </div>
        );
    }
}

