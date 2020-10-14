import {CHANGE_INPUT, CREATE_TABLE} from "@/store/types";

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
                currentText: data.value,
                tableData: prevState
            }
        }

        default: return state

    }
}