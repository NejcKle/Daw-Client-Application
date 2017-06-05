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
        this.emit("change");
    }

    connectKlass() {
        this.emit("change");
    }

    disconnectKlass() {
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
            case "CONNECT_KLASS": {
                this.connectKlass();
                break;
            }
            case "DISCONNECT_KLASS": {
                this.disconnectKlass();
                break;
            }
        }
    }
}

const klassStore = new KlassStore();
Dispatcher.register(klassStore.handleActions.bind(klassStore));
export default klassStore;
