const React = require('react')
const ReactDom = require('react-dom')
import './index.css';

const fetch = require('isomorphic-fetch')

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

//še vedno funkcija
const Welcome2 = (props) => {
    return <h1>Hello {props.name}</h1>;
}

//vrne isto stvar ampak ni treba pisa return, zaradi () oklepajev!!!
const Welcome3 = () => (
    <h1>Hello Nejc3</h1>
)



const render2 = () => (
	<Welcome2 name=""/>
)

const render3 = () => (
	<Welcome3/>
)

const model = {
    'm_students': [
        {m_name: 'Alice', m_number: 12345},
        {m_name: 'Bob', m_number: 23456},
        {m_name: 'Nejc', m_number: 34567},
        {m_name: 'Vid', m_number: 45678}
	]
}



//const funkcija more bit vedno z vlko!!
const Welcome4 = (props) => (
    <div>
        {props.students.map(s => (
            <h1>Hello {s.m_name} with number {s.m_number}</h1>
        ))}
    </div>
)

class Form extends React.Component {
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

const model2 = {
    'students': [
        {name: 'Alice', number: 12345},
        {name: 'Bob', number: 23456},
        {name: 'Nejc', number: 34567},
        {name: 'Vid', number: 45678}
	]
}

const model3 = []
/*
const Student = {
    name: '', number: '', email: '', id: ''}
*/
class Student {
    constructor(name, number, email, id) {
        this.name = name;
        this.number = number;
        this.email = email;
        this.id = id;
    }
}

const GetStudents = () => {
    fetch('http://localhost:8080/students/user42')
      .then(
        function(response) {
          // Examine the text in the response
          response.text()
              .then(function(data) {
              console.log(data);
              var obj = JSON.parse(data);
              Student.name = obj.properties.name;
              Student.number = obj.properties.number;
              Student.email = obj.properties.email;
              Student.id = obj.properties.id;
              model3.push(Student);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      })
}

const AddStudent = (props) => {
    var myHeaders = new Headers();

    var authorizationBasic = btoa("admin:admin");

    myHeaders.append('Authorization', 'Basic ' + authorizationBasic);
    myHeaders.append('Content-Type', 'application/vnd.siren+json');

    //object containing data passed from form
    var student = {name: props.name, email: props.email, number: props.number, id:props.s_id};

    var data = JSON.stringify(
        student
    )

    var myInit = {
        method: 'POST',
        headers: myHeaders,
        body: data
    };

    var myRequest = new Request('http://localhost:8080/students/', myInit)

    fetch(myRequest)
      .then(
        function(response) {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      })
}


const DisplayStudent = (props) => (
    <div>
        <table>
                <tbody>
                    <tr><td>Name</td><td>Number</td><td>Email</td><td>Id</td></tr>

    {props.students.map(s => (
            <tr><td>{s.name}</td><td>{s.number}</td><td>{s.email}</td><td>{s.id}</td></tr>
        ))}
                </tbody>
        </table>
    </div>
)

class DisplayStudents extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
        students: []
    }
  }

    componentDidMount() {
    fetch('http://localhost:8080/students/')
      .then(
        (response) => {
          // Examine the text in the response
          response.text()
              .then((data) => {
                  console.log(data);
                  var obj = JSON.parse(data);
                console.log(obj);
                    var numOfStudents = obj.entities.length;
              console.log(numOfStudents);
                var studentArray = [];
                for(var i = 0; i < numOfStudents; i++) {
                    let StudentTemp = new Student(obj.entities[i].properties.name, obj.entities[i].properties.number, obj.entities[i].properties.email, obj.entities[i].properties.id);
                    console.log(StudentTemp);
                    studentArray.push(StudentTemp);
                }

                  this.setState({students: studentArray});
                console.log(this.state.students);
               });
          }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      })
  }

    render() {
    return (
    <DisplayStudent students={this.state.students} />
)}
}

const GetStudentButton = () => (
        <button type="button" onClick={GetStudents}>Get students!</button>
)

const AddStudentButton = () => (
        <button type="button" onClick={AddStudent}>Add student!</button>
)

const render4 = (model) => (
	<div>
        <Welcome4 students={model.m_students}/>
        <Welcome3/>
        <Welcome2 name="Nejc"/>
        <GetStudentButton/>
        <Form/>
        <DisplayStudents/>
    </div>
)

ReactDom.render(
	render4(model),
	document.getElementById('root')
)
