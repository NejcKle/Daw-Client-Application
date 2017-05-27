import Dispatcher from "../Dispatcher"

export function addStudent() {
    Dispatcher.dispatch({
        type: "ADD_STUDENT",
    })
}

export function removeStudent() {
    Dispatcher.dispatch({
        type: "REMOVE_STUDENT",
    })
}
