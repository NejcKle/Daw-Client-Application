const React = require('react')

import AddGroup from './GroupAdd'
import { FormControl, Button } from 'react-bootstrap'

export default class GroupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      students_limit: '',
      g_id: ''
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
    AddGroup({ name: this.state.name, students_limit: this.state.students_limit, g_id: this.state.g_id });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Id:
          <FormControl name="g_id" type="text" value={this.state.g_id} onChange={this.handleChange} required="true"/>
        </label>
        <label>
          Name:
          <FormControl name="name" type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Students limit:
          <FormControl name="students_limit" type="number" value={this.state.students_limit} onChange={this.handleChange} />
        </label>
        <Button type="submit">Add Group</Button>
      </form>
    );
  }
}
