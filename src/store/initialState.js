import {storage} from "@core/utils";

const defaultState = {
    tableCols: {},
    tableRows: {},
    currentValue: '',
    tableData: {}
}

export const initialState = storage('data') || defaultState