import Dispatcher from "../Dispatcher"

export function addTeacher() {
    Dispatcher.dispatch({
        type: "ADD_TEACHER",
    })
}

export function removeTeacher() {
    Dispatcher.dispatch({
        type: "REMOVE_TEACHER",
    })
}
