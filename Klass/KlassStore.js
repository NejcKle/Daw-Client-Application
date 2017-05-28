import { EventEmitter } from 'events'

import Dispatcher from '../Dispatcher'

class KlassStore extends EventEmitter {
    constructor() {
        super()
    }

    removeKlass() {
        this.emit("change");
    }

    addKlass() {
        this.containsData = true;
        this.emit("change");
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
