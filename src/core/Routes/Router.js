import {$} from "@core/dom";
import {ActiveRoute} from "@core/Routes/ActiveRoute";

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw Error('No selector provided')
        }

        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null

        this.changePageHandler = this.changePageHandler.bind(this)

        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler() {

        this.$placeholder.clear()
        if (this.page) {
            this.page.destroy()
        }

        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard
        this.page = new Page()
        this.$placeholder.append(this.page.getRoot())

        this.page.afterRender()
    }

    destroy() {
        window.remove('hashchange', this.changePageHandler)
    }
}