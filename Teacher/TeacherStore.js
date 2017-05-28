import { EventEmitter } from 'events';

import Dispatcher from '../Dispatcher'

class TeacherStore extends EventEmitter {
    constructor() {
        super()
    }

    removeTeacher() {
        this.emit("change");
    }

    addTeacher() {
        this.containsData = true;
        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case "ADD_TEACHER": {
                this.addTeacher();
                break;
            }
            case "REMOVE_TEACHER": {
                this.removeTeacher();
                break;
            }
        }
    }
}

const teacherStore = new TeacherStore();
Dispatcher.register(teacherStore.handleActions.bind(teacherStore));
export default teacherStore;
