import { EventEmitter } from 'events'

import Dispatcher from '../Dispatcher'

class GroupStore extends EventEmitter {
    constructor() {
        super()
        this.containsData = false
    }

    removeGroup() {
        this.emit("change");
    }

    addGroup() {
        this.containsData = true;
        this.emit("change");
    }

    connectGroup() {
        this.emit("change");
    }

    disconnectGroup() {
        this.emit("change");
    }

    getState() {
        return this.containsData;
    }

    handleActions(action) {
        switch(action.type) {
            case "ADD_GROUP": {
                this.addGroup();
                break;
            }
            case "REMOVE_GROUP": {
                this.removeGroup();
                break;
            }
            case "CONNECT_GROUP": {
                this.connectGroup();
                break;
            }
            case "DISCONNECT_GROUP": {
                this.disconnectGroup();
                break;
            }
        }
    }
}

const groupStore = new GroupStore();
Dispatcher.register(groupStore.handleActions.bind(groupStore));
export default groupStore;
