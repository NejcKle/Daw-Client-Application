import KlassDisplay from '../Klass/KlassDisplay'
import TeacherForm from '../Teacher/TeacherForm'
const React = require('react')

export default class KlassDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containsData: false,
            id: '',
            identifier: '',
            auto_enrolment: '',
            students_id: [],
            //group_id: [],
            teachers_id: []
        }
    }

    componentWillMount() {
        fetch('http://localhost:8080' + this.props.location.pathname)
            .then(
            (response) => {
                if (response.status === 404) {
                    this.setState({ containsData: false });
                }
                else if (response.status === 200) {
                    this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
                            //console.log(data);
                            this.setState({ id: obj.properties.id });
                            this.setState({ identifier: obj.properties.identifier });
                            this.setState({ auto_enrolment: obj.properties.enrolment_auto });
                            var studentsArray = [];
                            var teachersArray = [];
                            for (var i = 0; i < obj.entities.length; i++) {
                                if (obj.entities[i].title === "student") {
                                    studentsArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }
                                if (obj.entities[i].title === "teacher") {
                                    teachersArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }
                            }
                            this.setState({ students_id: studentsArray });
                            this.setState({ teachers_id: teachersArray });
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
                <h1> Class Detail </h1>
                <KlassDisplay id={this.state.id} identifier={this.state.identifier} auto_enrolment={this.state.auto_enrolment} students_id={this.state.students_id} teachers_id={this.state.teachers_id} containsData={this.state.containsData} />
                <TeacherForm />
            </div>
        );
    }
}