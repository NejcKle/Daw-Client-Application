const React = require('react')
const fetch = require('isomorphic-fetch')
import Group from './Group'
import DisplayGroups from './GroupsDisplay'
import GroupStore from './GroupStore'

export default class GroupList extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            groups: [],
            containsData: false,
            connectedGroups: [],
            notConnectedGroups: []
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
                            setTimeout(() => {
                                var connectedGroupsArray = [];
                                var notConnectedGroupsArray = [];

                                for (var j = 0; j < numOfGroups; j++) {
                                    var added = false;
                                    //console.log(this.props.connectedGroups);
                                    for (var k = 0; k < this.props.connectedGroups.length; k++) {
                                        //console.log(this.props.connectedGroups);
                                        if (this.props.connectedGroups[k] === this.state.groups[j].id) {

                                            if (connectedGroupsArray.indexOf(this.state.groups[j]) < 0) {
                                                //console.log(this.state.groups[j].id);
                                                connectedGroupsArray.push(this.state.groups[j]);
                                                added = true;
                                            }
                                        }


                                    }
                                        if(!added) {
                                            //console.log(this.state.groups[j].id);
                                            notConnectedGroupsArray.push(this.state.groups[j]);
                                        }

                                }
                                this.setState({ connectedGroups: connectedGroupsArray, notConnectedGroups: notConnectedGroupsArray });
                            }, 500);
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
                <DisplayGroups groups={this.state.groups} containsData={this.state.containsData} classId={this.props.classId} connectedGroups={this.state.connectedGroups} notConnectedGroups={this.state.notConnectedGroups} />
            </div>
        )
    }
}
