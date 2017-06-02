import GroupDisplay from '../Group/GroupDisplay'
const React = require('react')

export default class GroupDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containsData: false,
            id: '',
            name: '',
            students_limit: '',
            klass_id: '',
            students_id: []
        }
    }

    componentWillMount() {
        fetch('http://localhost:8080' + this.props.location.pathname)
            .then(
            (response) => {
                if (response.status === 404) {
                    this.setState({ containsData: false });
                }
                else if (response.status === 200) {
                    this.setState({containsData: true});
                    response.text()
                    .then((data) => {
                        var obj = JSON.parse(data);
                        //console.log(data);
                        this.setState({ id: obj.properties.id });
                        this.setState({ name: obj.properties.name });
                        this.setState({ students_limit: obj.properties.students_limit });
                        var klass;
                        var studentsArray = [];
                        for (var i = 0; i < obj.entities.length; i++) {
                                if (obj.entities[i].title === "student") {
                                    studentsArray.push(obj.entities[i].links[0].href.split('/').pop());
                                }
                                if (obj.entities[i].title === "class") {
                                    klass = obj.entities[i].links[0].href.split('/').pop();
                                }
                            }
                            this.setState({ students_id: studentsArray });
                            this.setState({klass_id: klass});
                    });
                }
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }
    render() {
        return (
            <div>
                <h1> Group Detail </h1>
                <GroupDisplay id={this.state.id} name={this.state.name} students_limit={this.state.students_limit} klass_id={this.state.klass_id} students_id={this.state.students_id} containsData={this.state.containsData} />
            </div>
        );
    }
}