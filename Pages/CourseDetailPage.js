import CourseDisplay from '../Course/CourseDisplay'
import KlassForm from '../Klass/KlassForm'
const React = require('react')

export default class CourseDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containsData: false,
            name: '',
            acronim: '',
            id: '',
            teacher_id: ''
        }
    }

    componentWillMount() {
        fetch('http://localhost:8080' + this.props.location.pathname)
            .then(
                (response) => {
                    console.log(response);
                    if (response.status === 404) {
                         this.setState({ containsData: false });
                    }
                    else if (response.status === 200) {
                        this.setState({ containsData: true });
                        response.text()
                            .then((data) => {
                            var obj = JSON.parse(data);
                            console.log(obj);
                            this.setState({ name: obj.properties.name });
                            this.setState({ id: obj.properties.id });
                            this.setState({ acronim: obj.properties.acronim });
                            var teacher;
                            for (var i = 0; i < obj.entities.length; i++) {
                                //console.log(obj.entities[i].title);
                                if (obj.entities[i].title === "teacher") {
                                    teacher = obj.entities[i].links[0].href.split('/').pop();
                                }
                            }
                            console.log(teacher);
                            this.setState({ teacher_id: teacher });
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
        return (
            <div>
                <h1> Course Detail </h1>
                <CourseDisplay name={this.state.name} id={this.state.id} acronim={this.state.acronim} containsData={this.state.containsData} teacher_id={this.state.teacher_id} />
                <br/>
                <a href='/classes/'>Classes list</a>
                <br/>
                <p>Create new class:<br/>
                <KlassForm />
                </p>
            </div>
        );
    }
}