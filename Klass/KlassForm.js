const React = require('react')

import AddKlass from './KlassAdd'
import { FormControl, Button } from 'react-bootstrap'

export default class KlassForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      enrolment: false,
      k_id: ''
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
    this.setState({ enrolment: !this.state.enrolment });
  }

  handleSubmit(event) {
    event.preventDefault();
    AddKlass({ identifier: this.state.identifier, enrolment: this.state.enrolment, k_id: this.state.k_id });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Id:
          <FormControl name="k_id" type="text" value={this.state.k_id} onChange={this.handleChange} required="true" />
        </label>
        <label>
          Name:
          <FormControl name="identifier" type="text" value={this.state.identifier} onChange={this.handleChange} />
        </label>
        <label>
          Auto Enrolment:
          <FormControl name="enrolment" type="checkbox" onChange={this.changeCheck} checked={this.state.enrolment} />
        </label>
        <Button type="submit">Add Class</Button>
      </form>
    );
  }
}
