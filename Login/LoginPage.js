const React = require('react')
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import CourseListPage from '../Pages/CourseListPage'
import TeacherDetailPage from '../Pages/TeacherDetailPage'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            admin: false
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
            this.setState({admin: true});
        }
    }

    render() {
        if (this.state.password === 'student' && this.state.loggedIn === true) {
            return (<Redirect to={'/students/' + this.state.username} />)
        }

        else if (this.state.password === 'teacher' && this.state.loggedIn === true) {
            return (<TeacherDetailPage location={{pathname: '/teachers/' + this.state.username}} admin={this.state.admin} />)
        }

        else if (this.state.password === 'admin' && this.state.loggedIn === true) {
            return (
                <CourseListPage admin={this.state.admin} />
            )
        }

        else {
            return (
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Username:
                            <input name="username" type="text" value={this.state.s_id} onChange={this.handleChange} required="true" />
                    </label>
                    <label>
                        Password:
                            <input name="password" type="text" value={this.state.name} onChange={this.handleChange} required="true" />
                    </label>
                    <input type="submit" value="Login" />
                </form>

            );
        }
    }
}