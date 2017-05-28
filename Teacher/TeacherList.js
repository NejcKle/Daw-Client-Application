const React = require('react')
const fetch = require('isomorphic-fetch')
import Teacher from './Teacher'
import DisplayTeachers from './TeacherDisplay'
import TeacherStore from './TeacherStore'

export default class TeacherList extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            teachers: [],
            containsData: false
        }
    }

    fetchData() {
        fetch('http://localhost:8080/teachers/')
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
                            var numOfTeachers = obj.entities.length;
                            var teacherArray = [];
                            for (var i = 0; i < numOfTeachers; i++) {
                                let TeacherTemp = new Teacher(obj.entities[i].properties.name, obj.entities[i].properties.number, obj.entities[i].properties.email, obj.entities[i].properties.id, obj.entities[i].properties.admin);
                                teacherArray.push(TeacherTemp);
                            }
                            this.setState({ teachers: teacherArray });
                        });
                }
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    componentDidMount() {
        TeacherStore.on("change", this.fetchData);
    }

    componentWillMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <DisplayTeachers teachers={this.state.teachers} containsData={this.state.containsData} />
            </div>
        )
    }
}
