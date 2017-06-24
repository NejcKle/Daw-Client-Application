const React = require('react')

import KlassDisplay from '../Klass/KlassDisplay'
import TeacherList from '../Teacher/TeacherList'
import StudentList from '../Student/StudentList'
import GroupList from '../Group/GroupList'
import KlassStore from '../Klass/KlassStore'

export default class KlassDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containsData: false,
            id: '',
            identifier: '',
            auto_enrolment: '',
            semester_id: '',
            students_id: [],
            groups_id: [],
            teachers_id: []
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    componentDidMount() {
        KlassStore.on("change", this.fetchData);
    }

    fetchData() {
        var url = window.location.pathname;
        var class_id = url.substring(url.lastIndexOf('/'));
        //console.log(class_id);
        fetch('http://localhost:8080/classes' + class_id)
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
                            var groupsArray = [];
                            var semester;
                            for (var i = 0; i < obj.entities.length; i++) {
                                if (obj.entities[i].title === "student") {
                                    studentsArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }
                                if (obj.entities[i].title === "teacher") {
                                    teachersArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }
                                if (obj.entities[i].title === "group") {
                                    groupsArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }
                                if (obj.entities[i].title === "semester") {
                                    semester = obj.entities[i].properties.name;
                                }
                            }
                            setTimeout(() => {
                                this.setState({ students_id: studentsArray });
                                this.setState({ teachers_id: teachersArray });
                                this.setState({ groups_id: groupsArray });
                                this.setState({ semester_id: semester});
                            }, 5)
                        });
                }
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
    }

    render() {
        if (this.state.containsData && this.props.admin === true) {
            return (
                <div>
                    <h1> Class Detail </h1>
                    <KlassDisplay id={this.state.id} identifier={this.state.identifier} auto_enrolment={this.state.auto_enrolment} students_id={this.state.students_id} teachers_id={this.state.teachers_id} groups_id={this.state.groups_id} semester_id={this.state.semester_id} containsData={this.state.containsData} />
                    <TeacherList classId={window.location.pathname} connectedTeachers={this.state.teachers_id} />
                    <StudentList classId={window.location.pathname} connectedStudents={this.state.students_id} />
                    <GroupList classId={window.location.pathname} connectedGroups={this.state.groups_id} />

                </div>
            );
        }
        else {
            return (
                <div>
                    <h1> Class Detail </h1>
                    <KlassDisplay id={this.state.id} identifier={this.state.identifier} auto_enrolment={this.state.auto_enrolment} students_id={this.state.students_id} teachers_id={this.state.teachers_id} groups_id={this.state.groups_id} semester_id={this.state.semester_id} containsData={this.state.containsData} />
                </div>
            );
        }
    }
}