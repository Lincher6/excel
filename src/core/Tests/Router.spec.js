import {Router} from "../Routes/Router";
import {Page} from "../../pages/Page";


class Dashboard extends Page {
    getRoot() {
        const root = document.createElement('div')
        root.innerHTML = "dashboard"
        return root
    }
}

class Excel extends Page {

}

describe("Router:", () => {
    let root
    let router

    beforeEach(() => {
        root = document.createElement('div')
        router = new Router( root, {
            dashboard: Dashboard,
            excel: Excel
        })
    })

    test("router defined", () => {
        expect(router).toBeDefined()
    })

    test("should Render", () => {
        router.changePageHandler()
        expect(root.innerHTML).toBe(`<div>dashboard</div>`)
    })
})