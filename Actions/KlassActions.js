import Dispatcher from "../Dispatcher"

export function addKlass() {
    Dispatcher.dispatch({
        type: "ADD_KLASS",
    })
}

export function removeKlass() {
    Dispatcher.dispatch({
        type: "REMOVE_KLASS",
    })
}

export function connectKlass() {
    Dispatcher.dispatch({
        type: "CONNECT_KLASS",
    })
}

export function disconnectKlass() {
    Dispatcher.dispatch({
        type: "DISCONNECT_KLASS",
    })
}