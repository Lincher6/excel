import {Page} from "@/pages/Page";
import {createStore} from "@core/createStore";
import {rootReducer} from "@/store/rootReducer";
import {initialState} from "@/store/initialState";
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {debounce, storage} from "@core/utils";
import {ActiveRoute} from "@core/Routes/ActiveRoute";

export class ExcelPage extends Page {

    getRoot() {
        const store = createStore(rootReducer, initialState)
        const tableName = ActiveRoute.params[1]

        const stateListener = state => {
            storage(`excel:${tableName}`, state)
        }

        store.subscribe(debounce(stateListener, 500))

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}