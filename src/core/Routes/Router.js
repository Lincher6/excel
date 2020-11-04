import {$} from "@core/dom";
import {ActiveRoute} from "@core/Routes/ActiveRoute";

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw Error('No selector provided')
        }

        this.$placeholder = $(selector)
        this.routes = routes

        this.changePageHandler = this.changePageHandler.bind(this)

        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler() {
        console.log(ActiveRoute.path)
        console.log(ActiveRoute.param)
    }

    destroy() {
        window.remove('hashchange', this.changePageHandler)
    }
}