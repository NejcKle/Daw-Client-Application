const React = require('react')
const fetch = require('isomorphic-fetch')
import Klass from './Klass'
import DisplayKlass from './KlassDisplay'
import KlassStore from './KlassStore'

export default class KlassList extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            klasses: [],
            containsData: false
        }
    }

    fetchData() {
        fetch('http://localhost:8080/classes/')
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
                            var klassesArray = [];
                            for (var i = 0; i < numOfKlasses; i++) {
                                let KlassTemp = new Klass(obj.entities[i].properties.identifier, obj.entities[i].properties.enrolment_auto, obj.entities[i].properties.id);
                                klassesArray.push(KlassTemp);
                            }
                            this.setState({ klasses: klassesArray });
                        });
                }
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    componentDidMount() {
        KlassStore.on("change", this.fetchData);
    }

    componentWillMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <DisplayKlass klasses={this.state.klasses} containsData={this.state.containsData} />
            </div>
        )
    }
}
