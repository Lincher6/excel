import {Page} from "@/pages/Page";
import {createStore} from "@core/createStore";
import {rootReducer} from "@/store/rootReducer";
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {debounce, getTableName, storage} from "@core/utils";
import {normalizeInitialState} from "@/store/initialState";

export class ExcelPage extends Page {

    getRoot() {
        const initialState = normalizeInitialState(storage(getTableName()))

        const store = createStore(rootReducer, initialState)

        const stateListener = state => {
            storage(getTableName(), state)
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