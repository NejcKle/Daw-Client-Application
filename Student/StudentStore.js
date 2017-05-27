import { EventEmitter } from 'events';

import Dispatcher from '../Dispatcher';

class StudentStore extends EventEmitter {
    constructor() {
        super()
        this.students = [];
    }

    removeStudent() {
        this.emit("change");
    }

    addStudent() {
        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case "ADD_STUDENT": {
                this.addStudent();
                break;
            }
            case "REMOVE_STUDENT": {
                this.removeStudent();
                break;
            }
        }
    }
}

const studentStore = new StudentStore();
Dispatcher.register(studentStore.handleActions.bind(studentStore));
export default studentStore;