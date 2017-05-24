const React = require('react')
const ReactDom = require('react-dom')
const fetch = require('isomorphic-fetch')
import AddStudent from './StudentAdd'

export default class StudentForm extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
        name : '',
        number : '',
        s_id : '',
        email : ''
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
    AddStudent({name:this.state.name, number:this.state.number, s_id:this.state.s_id, email:this.state.email});
  }

render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Name:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Number:
          <input name="number" type="text" value={this.state.number} onChange={this.handleChange} />
        </label>
        <label>
          Id:
          <input name="s_id" type="text" value={this.state.s_id} onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add Student" />
      </form>
    );
  }
}
