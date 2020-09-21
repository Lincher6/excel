 import { $ } from "@core/dom"

export class Excel {
    constructor(selector, options) {
        this.$appElement = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        this.components = this.components.map(Component => {
            const $element = $.create('div', Component.className)
            const component = new Component($element)
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
}