import {storage} from "@core/utils";
import {defaultStyles, defaultTitle} from "@/constants";

const defaultState = {
    title: defaultTitle,
    tableCols: {},
    tableRows: {},
    stylesData: {},
    tableData: {},
    currentValue: '',
    currentStyles: defaultStyles,
}

export const initialState = storage('data') || defaultState