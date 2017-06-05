const React = require('react')
import { Redirect } from "react-router-dom";

import CourseListPage from '../Pages/CourseListPage'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            buttonPressed: false,
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
        this.setState({ buttonPressed: true });
        if (this.state.username === 'admin' && this.state.password === 'admin') this.setState({ admin: true })
    }

    render() {
        if (this.state.password === 'student' && this.state.buttonPressed === true) {
            return (<Redirect to={'/students/' + this.state.username} />)
        }

        else if (this.state.password === 'teacher' && this.state.buttonPressed === true) {
            return (<Redirect to={'/teachers/' + this.state.username} />)
        }

        else if (this.state.password === 'admin' && this.state.buttonPressed === true) {
            return (<CourseListPage admin={this.state.admin} />)
        }

        else {
            return (
                <div>
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
                    <br />
                    <CourseListPage admin={this.state.admin} />
                </div>
            );
        }
    }
}