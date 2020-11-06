import {APPLY_STYLES, CHANGE_INPUT, CHANGE_STYLES, CHANGE_TITLE, CREATE_TABLE, UPDATE_DATE} from "@/store/types";

export const createTable = payload => {
    return {
        type: CREATE_TABLE,
        payload
    }
}

export const changeInput = payload => {
    return {
        type: CHANGE_INPUT,
        payload
    }
}

export const changeStyles = payload => {
    return {
        type: CHANGE_STYLES,
        payload
    }
}

export const applyStyles = (ids, value) => {
    return {
        type: APPLY_STYLES,
        payload: { ids, value }
    }
}

export const changeTitle = payload => {
    return {
        type: CHANGE_TITLE,
        payload
    }
}

export const updateDate = () => {
    return {
        type: UPDATE_DATE
    }
}