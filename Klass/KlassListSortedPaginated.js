const React = require('react')
const fetch = require('isomorphic-fetch')
import Klass from './Klass'
import DisplayKlasses from './KlassesDisplay'
import KlassStore from './KlassStore'
import { Button } from 'react-bootstrap'

var courseClassLinksArray2 = [];

export default class KlassList extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.fetchNext = this.fetchNext.bind(this);
        this.getNumberOfKlasses = this.getNumberOfKlasses.bind(this);
        this.incrementButton = this.incrementButton.bind(this);
        this.decrementButton = this.decrementButton.bind(this);
        this.state = {
            klasses: [],
            containsData: false,
            currentPage: 0,
            pageSize: 10,
            prevDisabled: true,
            nextDisabled: true,
            courseClassLinks: []
        }
        this.fetchCourseClassConnection = this.fetchCourseClassConnection.bind(this);
    }

    incrementButton() {
        this.setState({ currentPage: this.state.currentPage + 1 });
        setTimeout(() => {
            this.fetchData();
        }, 1)
    }

    decrementButton() {
        this.setState({ currentPage: this.state.currentPage - 1 });
        setTimeout(() => {
            this.fetchData();
        }, 1)
    }

    getNumberOfKlasses() {
        fetch('http://localhost:8080/classes')
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
                            var numOfKlasses = obj.entities.length;
                            //console.log(numOfKlasses);
                            if (numOfKlasses > this.state.pageSize) {
                                //console.log("changing state of prev button");
                                this.setState({ nextDisabled: false });
                            }
                        });
                }
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    fetchNext() {
        var next = this.state.currentPage + 1;
        fetch('http://localhost:8080/classes/listed/' + next + '/' + this.state.pageSize + '/descending')
            .then(
            (response) => {
                if (response.status === 404) {
                    //this.setState({ containsData: false });
                }

                else if (response.status === 200) {
                    //console.log("fetching:" + 'http://localhost:8080/classes/listed/' + next + '/' + this.state.pageSize + '/descending');
                    //this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
                            var numOfKlasses = obj.entities.length;
                            console.log("numOfClasses" + numOfKlasses);
                            if (numOfKlasses > 0) {
                                this.setState({ nextDisabled: false });
                            }
                            else {
                                this.setState({ nextDisabled: true });
                            }
                        });
                }
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    fetchData() {
        if (this.state.currentPage === 0) {
            this.setState({ prevDisabled: true });
            //console.log("fetch data function" + this.state.currentPage);
        }
        else {
            this.setState({ prevDisabled: false });
        }

        fetch('http://localhost:8080/classes/listed/' + this.state.currentPage + '/' + this.state.pageSize + '/descending')
            .then(
            (response) => {
                if (response.status === 404) {
                    //this.setState({ containsData: false });
                }
                else if (response.status === 200) {
                    //console.log("fetching:" + 'http://localhost:8080/classes/listed/' + this.state.currentPage + '/' + this.state.pageSize + '/descending');
                    //this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
                            var numOfKlasses = obj.entities.length;
                            var klassesArray = [];
                                                            courseClassLinksArray2 = [];
                            for (var i = 0; i < numOfKlasses; i++) {
                                var KlassTemp = new Klass(obj.entities[i].properties.identifier, obj.entities[i].properties.enrolment_auto, obj.entities[i].properties.id);
                                klassesArray.push(KlassTemp);
                                console.log(KlassTemp);

                                    this.fetchCourseClassConnection(KlassTemp);
                                //console.log(courseClassLinksArray);
                            }
                            setTimeout(() => {
                               this.setState({ klasses: klassesArray });
                            }, 50);
                        });
                    this.fetchNext();
                }
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            }
            )
    }

    componentDidMount() {
        KlassStore.on("change", this.fetchData);
    }

    componentWillMount() {
        this.fetchData();
        setTimeout(() => {
            this.getNumberOfKlasses();
        }, 5);

    }

    fetchCourseClassConnection(className) {
        //console.log("ime " + className.id);
        fetch('http://localhost:8080/classes/' + className.id)
            .then(
            (response) => {
                if (response.status === 404) {
                    //window.alert("Class not in database");
                    //this.setState({ containsData: false });
                }
                else if (response.status === 200) {
                    //this.setState({ containsData: true });
                    response.text()
                        .then((data) => {
                            var obj = JSON.parse(data);
                            for (var i = 0; i < obj.entities.length; i++) {
                                //console.log(obj.entities[i]);
                                if (obj.entities[i].title === "course") {
                                    //console.log("PRVI ALO " + obj.entities[i].properties.name);
                                    courseClassLinksArray2.push('/courses/' + obj.entities[i].properties.name + '/' + className.id);
                                }
                            }
                            setTimeout(() => {
                                this.setState({ courseClassLinks: courseClassLinksArray2 });
                                //console.log(this.state.courseClassLinks);
                            }, 5);
                        }
                        )
                }
            }
            )
    }

    render() {
        return (
            <div>
                <DisplayKlasses klasses={this.state.klasses} klasses_links={this.state.courseClassLinks} containsData={this.state.containsData} />
                <Button onClick={this.decrementButton} disabled={this.state.prevDisabled}>Prev</Button>
                <Button onClick={this.incrementButton} disabled={this.state.nextDisabled}>Next</Button>
            </div>
        )
    }
}
