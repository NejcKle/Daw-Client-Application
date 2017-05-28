import { EventEmitter } from 'events'

import Dispatcher from '../Dispatcher'

class CourseStore extends EventEmitter {
    constructor() {
        super()
    }

    removeCourse() {
        this.emit("change");
    }

    addCourse() {
        this.containsData = true;
        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case "ADD_COURSE": {
                this.addCourse();
                break;
            }
            case "REMOVE_COURSE": {
                this.removeCourse();
                break;
            }
        }
    }
}

const courseStore = new CourseStore();
Dispatcher.register(courseStore.handleActions.bind(courseStore));
export default courseStore;
