import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
    constructor($element, options = {}) {
        super($element, options.listeners)
        this.name = options.name || ''
    }

    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners()
    }
}