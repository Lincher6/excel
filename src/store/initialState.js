import {storage} from "@core/utils";

const defaultState = {
    tableCols: {},
    tableRows: {},
    currentState: '',
    tableData: {}
}

export const initialState = storage('data') || defaultState