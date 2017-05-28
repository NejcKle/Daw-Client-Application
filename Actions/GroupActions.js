import Dispatcher from "../Dispatcher"

export function addGroup() {
    Dispatcher.dispatch({
        type: "ADD_GROUP",
    })
}

export function removeGroup() {
    Dispatcher.dispatch({
        type: "REMOVE_GROUP",
    })
}
