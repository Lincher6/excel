import {APPLY_STYLES, CHANGE_INPUT, CHANGE_STYLES, CHANGE_TITLE, CREATE_TABLE} from "@/store/types";

export const rootReducer = (state, action) => {
    switch (action.type) {
        case CREATE_TABLE: {
            const data = action.payload
            const field = data.type === 'col' ? 'tableCols' : 'tableRows'
            const prevState = state[field] || {}
            prevState[data.id] = data.value
            return { ...state, [field]: prevState }
        }

        case CHANGE_INPUT: {
            const data = action.payload
            const prevState = state.tableData || {}
            prevState[data.id] = data.value
            return {
                ...state,
                currentValue: data.value,
                tableData: prevState
            }
        }

        case CHANGE_STYLES: {
            return { ...state, currentStyles: action.payload}
        }

        case APPLY_STYLES: {
            const {ids, value} = action.payload
            const newStyles = { ...state.stylesData }
            ids.forEach(id => {
                newStyles[id] = { ...state.stylesData[id], ...value }
            })
            return { ...state, currentStyles: value, stylesData: newStyles }
        }

        case CHANGE_TITLE: {
            return { ...state, title: action.payload}
        }

        default: return state

    }
}