 import { $ } from "@core/dom"
 import {Emitter} from "@core/Emitter";

export class Excel {
    constructor(selector, options) {
        this.$appElement = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const options = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $element = $.create('div', Component.className)
            const component = new Component($element, options)
            if (component.name) {
                window[`c${component.name}`] = component
            }
            $element.html(component.toHTML())
            $root.append($element)
            return component
        });

        return $root
    }

    render() {
        this.$appElement.append(this.getRoot())
        this.components.forEach(component => { component.init() })
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}