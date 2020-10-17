import {parse, toInlineStyles} from "@core/utils";
import {defaultStyles} from "@/constants";

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 80
const DEFAULT_HEIGHT = 20

const createCell = (row, state) => {
    return (_, col) => {
        const width = (state.tableCols[col] || DEFAULT_WIDTH) + 'px'
        const id = `${row}:${col}`
        const value = state.tableData[id] || ''
        const styles = toInlineStyles({ ...defaultStyles, ...state.stylesData[id] })
        return `
            <div 
                class="cell" 
                contentEditable
                data-col="${col}"
                data-type="cell"
                data-value="${value || ''}"
                data-id="${id}"
                style="${styles}; width: ${width}"
            >
               ${parse(value)}
            </div>
    `
    }
}

const createColumn = ({data, index, width}) => {
    return `
        <div 
            class="column-info" 
            data-type="resizable" 
            data-col="${index}"
            style="width: ${width}"
        >
            ${data}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

const createRow = (index, data, resizedRows = {}) => {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
    const height = (resizedRows[index] || DEFAULT_HEIGHT) + 'px'
    return `
        <div class="row" >
            <div 
                class="row-info" 
                data-type="resizable" 
                data-row="${index}"
                style="height: ${height}"
            >
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="data">${data}</div>
        </div>
    `
}

const codeToChar = (_, index) => String.fromCharCode(CODES.A + index)

const withColsWidth = (resizedCols) => {
    return (data, index) => ({
        data,
        index,
        width: resizedCols[index] + 'px'
    })
}

export const createTable = (state, rowsCount = 50) => {
    const columnsCount = CODES.Z - CODES.A + 1
    const rows = []
    const resizedCols = state.tableCols
    const resizedRows = state.tableRows

    const infoCollumns = new Array(columnsCount)
        .fill('')
        .map(codeToChar)
        .map(withColsWidth(resizedCols))
        .map(createColumn)
        .join('')

    rows.push(createRow(null, infoCollumns))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(columnsCount)
            .fill('')
            .map(createCell(row, state))
            .join('')
        rows.push(createRow(row + 1, cells, resizedRows))
    }

    return rows.join('')
}