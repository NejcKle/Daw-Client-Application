const React = require('react')
const ReactDom = require('react-dom')
const fetch = require('isomorphic-fetch')

export default class Student {
    constructor(name, number, email, id) {
        this.name = name;
        this.number = number;
        this.email = email;
        this.id = id;
    }
}
