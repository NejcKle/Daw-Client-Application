import Dispatcher from "../Dispatcher"

export function addCourse() {
    Dispatcher.dispatch({
        type: "ADD_COURSE",
    })
}

export function removeCourse() {
    Dispatcher.dispatch({
        type: "REMOVE_COURSE",
    })
}
