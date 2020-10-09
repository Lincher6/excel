import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template.js";
import {resize, shouldResize} from "@/components/table/table.resize";
import {TableSelection} from "@/components/table/TableSelection";
import {isCell, matrix, nextSelected} from "@/components/table/table.functions";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
    constructor($element, options) {
        super($element, {
            name: "table",
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    static className = 'excel__table'

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const initialCell = this.$element.get('[data-id="0:0"]')
        this.selectCell(initialCell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:enter', () => {
            this.selection.current.focus()
        })
    }

    selectCell = cell => {
        this.selection.select(cell)
        this.$emit('table:select', cell)
    }

    onMousedown = e => {
        if (shouldResize(e)) {
            resize(this.$element, e)
        }
        const target = $(e.target)
        if (isCell(target)) {
            if (e.shiftKey) {
                const ids = matrix(target, this.selection.current)
                const selectedCells = ids.map(id => $(`[data-id="${id}"]`))
                this.selection.selectGroup(selectedCells)
            } else {
                this.selectCell(target)
            }

        }
    }

    onKeydown = e => {

        const keys = [
            'Enter',
            'Tab',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown',
            'ArrowLeft',
        ]

        const {key} = e
        if (keys.includes(key) && !e.shiftKey) {
            e.preventDefault()
            const id = this.selection.current.id(true)
            this.selectCell(nextSelected(key, id))
        }
    }

    onInput = e => {
        this.$emit('table:input', $(e.target))
    }
}