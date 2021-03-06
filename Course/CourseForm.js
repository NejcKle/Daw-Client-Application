const React = require('react')

import AddCourse from './CourseAdd'
import {FormControl, Button} from 'react-bootstrap'

export default class CourseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      acronim: '',
      c_id: ''
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
    AddCourse({ name: this.state.name, acronim: this.state.acronim, c_id: this.state.c_id });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Id:
          <FormControl name="c_id" type="text" value={this.state.c_id} onChange={this.handleChange} required="true" />
        </label>
        <label>
          Name:
          <FormControl name="name" type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Acronim:
          <FormControl name="acronim" type="text" value={this.state.acronim} onChange={this.handleChange} />
        </label>
        <Button type="submit">Add Course</Button>
      </form>
    );
  }
}