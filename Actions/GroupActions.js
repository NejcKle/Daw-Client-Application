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

export function connectGroup() {
    Dispatcher.dispatch({
        type: "CONNECT_GROUP",
    })
}

export function disconnectGroup() {
    Dispatcher.dispatch({
        type: "DISCONNECT_GROUP",
    })
}