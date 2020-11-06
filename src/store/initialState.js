import {clone} from "@core/utils";
import {defaultStyles, defaultTitle} from "@/constants";

const defaultState = {
    title: defaultTitle,
    tableCols: {},
    tableRows: {},
    stylesData: {},
    tableData: {},
    currentValue: '',
    currentStyles: defaultStyles,
    date: new Date().toJSON()
}

export const normalizeInitialState = state => {
    return state ? state : clone(defaultState)
}