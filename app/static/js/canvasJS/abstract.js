export default class AbstractButton {
    constructor() {
        if (this.constructor == AbstractButton) {
          throw new Error('Abstract classes can\'t be instantiated.');
        }
    }
    draw() {
        throw new Error('Error. Method draw must be implemented')
    }
    click() {
        throw new Error('Error. Method click must be implemented')
    }
    hover() {
        throw new Error('Error. Method hover must be implemented')
    }
}