import {range} from "@core/utils";
import {$} from '@core/dom'
// new staff

export const isCell = (element) => {
    return element.data.type === 'cell'
}

export const matrix = (target, current) => {
    const targetId = target.id(true)
    const currentId = current.id(true)

    const rows = range(currentId.row, targetId.row)
    const cols = range(currentId.col, targetId.col)

    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export const nextSelected = (key, {row, col}) => {
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowUp':
            row = row - 1 > 0 ? row - 1 : 0
            break
        case 'ArrowLeft':
            col = col - 1 > 0 ? col - 1 : 0
            break
    }
    return $(`[data-id="${row}:${col}"]`)
}