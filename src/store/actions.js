import {CHANGE_INPUT, CREATE_TABLE} from "@/store/types";

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