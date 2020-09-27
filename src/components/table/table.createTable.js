const CODES = {
    A: 65,
    Z: 90
}

const createCell = (_, index) => {
    return `
        <div class="cell" contentEditable data-col="${index}">
            
        </div>
    `
}

const createColumn = (data, index) => {
    return `
        <div class="column-info" data-type="resizable" data-col="${index}" >
            ${data}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

const createRow = (index, data) => {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `
        <div class="row" >
            <div class="row-info" data-type="resizable">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="data">${data}</div>
        </div>
    `
}

const codeToChar = (_, index) => String.fromCharCode(CODES.A + index)

export const createTable = (rowsCount = 30) => {
    const columnsCount = CODES.Z - CODES.A + 1
    const rows = []

    const infoCollumns = new Array(columnsCount)
        .fill('')
        .map(codeToChar)
        .map(createColumn)
        .join('')

    rows.push(createRow(null, infoCollumns))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(columnsCount)
            .fill('')
            .map(createCell)
            .join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}