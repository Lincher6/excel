export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot() {
        throw Error('getRoot method is not implemented')
    }

    afterRender() {

    }

    destroy() {

    }
}