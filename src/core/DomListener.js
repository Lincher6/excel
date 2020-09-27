import {capitalize} from "@core/utils";

export class DomListener {
    constructor($element, listeners = []) {
        if (!$element) {
            throw new Error('no element')
        }
        this.$element = $element
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name} component`)
            }
            this.$element.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$element.off(listener, this[method])
        })
    }

}

const getMethodName = (eventName) => {
    return 'on' + capitalize(eventName)
}