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
