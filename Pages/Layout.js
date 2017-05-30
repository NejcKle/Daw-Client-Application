const ReactDom = require('react-dom')
const React = require('react')
import {Link} from 'react-router-dom'
import '../index.css';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <h1> Layout Page </h1>
                <Link to='/students'>students</Link>
                <br/>
                <Link to='/teachers'>teachers</Link>
                <br/>
                <Link to='/groups'>groups</Link>
                <br/>
                <Link to='/classes'>classes</Link>
                <br/>
                <Link to='/courses'>courses</Link>
            </div>
        )
    }

    //StudentDetail prejme url do studenta, ki ga potem tudi rendera, url bo prejet ob kliku na link

/*                
 <div>
                <StudentListPage />
                <br />
                <CourseListPage />
                <br />
                <KlassListPage />
                <br />
                <GroupListPage />
                <br />
                <TeacherListPage />

            </div>
<br />
                <StudentDetail url={'http://localhost:8080/students/user1'} />
                <StudentDetail url={'http://localhost:8080/students/user12'} />
                
                */
}