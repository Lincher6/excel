import { Excel } from '@/components/excel/Excel'
import { Formula } from '@/components/formula/Formula'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Table } from '@/components/table/Table'
import './styles/index.scss'
import {createStore} from "@core/createStore";
import {rootReducer} from "@/store/rootReducer";
import {debounce, storage} from "@core/utils";
import {initialState} from "@/store/initialState";

const store = createStore(rootReducer, initialState)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

const stateListener = state => {
    storage('data', state)
}

store.subscribe(debounce(stateListener, 500))
excel.render()