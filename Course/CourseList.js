const React = require('react')
const fetch = require('isomorphic-fetch')
import Courses from './Course'
import DisplayCourses from './CourseDisplay'

export default class CourseList extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
        courses: []
    }
  }

    componentDidMount() {
    fetch('http://localhost:8080/courses/')
      .then(
        (response) => {
          // Examine the text in the response
          response.text()
              .then((data) => {
                    console.log(data);
                    var obj = JSON.parse(data);
                    console.log(obj);
                    var numOfCourses = obj.entities.length;
                    console.log(numOfCourses);
                    var coursesArray = [];
                for(var i = 0; i < numOfCourses; i++) {
                    let CoursesTemp = new Courses(obj.entities[i].properties.name, obj.entities[i].properties.acronim, obj.entities[i].properties.id);
                    console.log(CoursesTemp);
                    coursesArray.push(CoursesTemp);
                }
                this.setState({courses: coursesArray});
                console.log(this.state.courses);
               });
          }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      })
  }

    render() {
        return (
            <DisplayCourses courses={this.state.courses} />
    )}
}
