const React = require('react')

import AddTeacher from './TeacherAdd'
import {FormControl, Button} from 'react-bootstrap'

export default class TeacherForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      number: '',
      t_id: '',
      email: '',
      admin: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.changeCheck = this.changeCheck.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  changeCheck() {
    this.setState({ admin: !this.state.admin });
  }

  handleSubmit(event) {
    event.preventDefault();
    AddTeacher({ name: this.state.name, number: this.state.number, t_id: this.state.t_id, email: this.state.email, admin: this.state.admin });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Id:
          <FormControl name="t_id" type="text" value={this.state.t_id} onChange={this.handleChange} required="true" />
        </label>
        <label>
          Name:
          <FormControl name="name" type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Number:
          <FormControl name="number" type="text" value={this.state.number} onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <FormControl name="email" type="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          Admin:
          <FormControl name="admin" type="checkbox" onChange={this.changeCheck} checked={this.state.admin} />
        </label>
        <Button type="submit">Add Teacher</Button>
      </form>
    );
  }
}
