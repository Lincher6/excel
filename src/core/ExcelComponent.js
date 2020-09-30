import {DomListener} from "./DomListener";

export class ExcelComponent extends DomListener {
    constructor($element, options = {}) {
        super($element, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.prepare()
    }

    toHTML() {
        return ''
    }

    prepare() {

    }

    $emit(event, ...options) {
        this.emitter.emit(event, ...options)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}