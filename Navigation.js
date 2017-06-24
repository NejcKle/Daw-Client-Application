const React = require('react')
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, FormControl, FormGroup } from 'react-bootstrap'

import Student from './Pages/StudentDetailPage'
import Courses from './Pages/CourseListPage'
import Course from './Pages/CourseDetailPage'

import ClassesListed from './Pages/KlassListPageSorted'

import Klass from './Pages/KlassDetailPage'
import Groups from './Pages/GroupListPage'
import Group from './Pages/GroupDetailPage'
import Teacher from './Pages/TeacherDetailPage'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            admin: false,
            role: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loggedIn: true });
        if (this.state.password === 'admin') {
            this.setState({ admin: true });
            this.setState({ role: 'admin' });
        }

        if (this.state.password === 'teacher') {
            this.setState({ role: 'teacher' });
        }

        if (this.state.password === 'student') {
            this.setState({ role: 'student' });
        }
    }

    logout() {

        this.setState({ loggedIn: false });
        this.setState({ admin: false });
        this.setState({ role: '' });
        this.setState({ username: '' });
        this.setState({ password: '' });
    }

    render() {
        const username = this.state.username;
        const isLoggedIn = this.state.loggedIn;
        const role = this.state.role;
        //console.log(isLoggedIn);
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/home">WAD Management application</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Nav>
                        <NavItem> <Link to="/courses">Courses</Link></NavItem>
                    </Nav>
                    <Navbar.Collapse>
                        {(!isLoggedIn) ? (
                            <Navbar.Form pullRight>
                                <FormGroup>
                                    <FormControl name="username" type="text" value={this.state.s_id} onChange={this.handleChange} required="true" placeholder="Username" />
                                    <FormControl name="password" type="text" value={this.state.name} onChange={this.handleChange} required="true" placeholder="Password" />

                                </FormGroup>
                                <Button type="submit" onClick={this.handleSubmit.bind(this)}>Log In</Button>
                            </Navbar.Form>)
                            : (
                                <Nav pullRight>
                                    <NavDropdown title={this.state.username} id="basic-nav-dropdown">
                                        <MenuItem onSelect={this.logout.bind(this)}>Logout</MenuItem>
                                    </NavDropdown>
                                </Nav>
                            )}
                    </Navbar.Collapse>
                </Navbar>

                <Route path='/students/:studentId' render={() => (isLoggedIn) ? ((role === 'admin') ? (<Student location={{ pathname: '' }} admin={this.state.admin} />) : (<Student location={{ pathname: '' }} />)) : <Redirect push to='/home' />}> </Route>
                <Route path='/teachers/:teacherId' render={() => (isLoggedIn) ? ((role === 'admin') ? (<Teacher admin={this.state.admin} location={{ pathname: '' }} />) : (<Teacher location={{ pathname: '' }} />)) : <Redirect push to='/home' />}></Route>
                <Route exact path='/home' render={() => (isLoggedIn) ? ((role === 'student') ? <Student location={{ pathname: '/students/' + username }} /> : ((role === 'teacher') ? <Teacher location={{ pathname: '/teachers/' + username }} /> : ((role === 'admin') ? <Courses admin={this.state.admin} loggedIn={isLoggedIn} /> : <Redirect push to='/home' />))) : <Courses loggedIn={isLoggedIn} />}></Route>
                <Route path='/courses/:courseId' render={() => (role === 'admin') ? (<Course admin={this.state.admin} loggedIn={isLoggedIn} />) : (<Course loggedIn={isLoggedIn} />)}></Route>
                <Route exact path='/courses' render={() => (role === 'admin') ? (<Courses admin={this.state.admin} loggedIn={isLoggedIn} />) : (<Courses loggedIn={isLoggedIn} />)}> </Route>
                <Route path='/classes/:classId' render={() => (isLoggedIn) ? ((role === 'admin') ? (<Klass admin={this.state.admin} />) : (<Klass />)) : <Redirect push to='/' />}> </Route>
                <Route exact path='/classes' render={() => (isLoggedIn) ? <ClassesListed /> : <Redirect push to='/classes' />}></Route>
                <Route exact path='/groups' component={Groups}></Route>
                <Route path='/groups/:groupId' component={Group}></Route>
            </div>
        );
    }
}

export default LoginPage;