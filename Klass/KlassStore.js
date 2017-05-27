import { EventEmitter } from 'events';

import Dispatcher from '../Dispatcher';
import Klass from './Klass'

class KlassStore extends EventEmitter {
    constructor() {
        super()
        this.containsData = false
    }

    removeKlass() {
        this.emit("change");
    }

    addKlass() {
        this.containsData = true;
        this.emit("change");
    }

    getState() {
        return this.containsData;
    }

    handleActions(action) {
        switch(action.type) {
            case "ADD_KLASS": {
                this.addKlass();
                break;
            }
            case "REMOVE_KLASS": {
                this.removeKlass();
                break;
            }
        }
    }
}

const klassStore = new KlassStore();
Dispatcher.register(klassStore.handleActions.bind(klassStore));
export default klassStore;
