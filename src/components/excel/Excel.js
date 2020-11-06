 import { $ } from "@core/dom"
 import {Emitter} from "@core/Emitter";
 import {StoreSubscriber} from "@/store/StoreSubscriber";
 import {updateDate} from "@/store/actions";
 import {preventDefault} from "@core/utils";

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.emitter = new Emitter()
        this.storeSubscriber = new StoreSubscriber(options.store)
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

    init() {
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }

        this.store.dispatch(updateDate())
        this.components.forEach(component => { component.init() })
        this.storeSubscriber.subscribeComponents(this.components)
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}