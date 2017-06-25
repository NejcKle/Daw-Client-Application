const React = require('react')
const fetch = require('isomorphic-fetch')
import Course from './Course'
import DisplayCourses from './CoursesDisplay'
import CourseStore from './CourseStore'

export default class CourseList extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            courses: [],
            containsData: false
        }
    }

    fetchData() {
        //console.log("courseList adminn" + this.props.admin)
        fetch('http://localhost:8080/courses/')
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
                            var numOfCourses = obj.entities.length;
                            var coursesArray = [];
                            for (var i = 0; i < numOfCourses; i++) {
                                let CoursesTemp = new Course(obj.entities[i].properties.name, obj.entities[i].properties.acronim, obj.entities[i].properties.id);
                                coursesArray.push(CoursesTemp);
                            }
                            this.setState({ courses: coursesArray });
                        });
                }

            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    componentDidMount() {
        CourseStore.on("change", this.fetchData);
    }

    componentWillMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <DisplayCourses courses={this.state.courses} containsData={this.state.containsData} admin={this.props.admin} loggedIn={this.props.loggedIn} />
            </div>
        )
    }
}
