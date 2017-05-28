const React = require('react')
const fetch = require('isomorphic-fetch')
import Group from './Group'
import DisplayGroups from './GroupDisplay'
import GroupStore from './GroupStore'

export default class GroupList extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            groups: [],
            containsData: false
        }
    }

    fetchData() {
        fetch('http://localhost:8080/groups/')
            .then(
            (response) => {
                if (response.status === 404) {
                    this.setState({ containsData: false });
                }

                else if (response.status === 200) {
                    this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
                            var numOfGroups = obj.entities.length;
                            var GroupsArray = [];
                            //console.log(data);
                            for (var i = 0; i < numOfGroups; i++) {
                                let GroupTemp = new Group(obj.entities[i].properties.name, obj.entities[i].properties.students_limit, obj.entities[i].properties.id);
                                GroupsArray.push(GroupTemp);
                            }
                            
                            this.setState({ groups: GroupsArray });
                        });
                }
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    componentDidMount() {
        GroupStore.on("change", this.fetchData);
    }

    componentWillMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <DisplayGroups groups={this.state.groups} containsData={this.state.containsData} />
            </div>
        )
    }
}
