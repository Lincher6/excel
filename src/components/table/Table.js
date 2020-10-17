import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template.js";
import {resizeHandler, shouldResize} from "@/components/table/table.resize";
import {TableSelection} from "@/components/table/TableSelection";
import {isCell, matrix, nextSelected} from "@/components/table/table.functions";
import {$} from "@core/dom";
import * as actions from '@/store/actions'
import {applyStyles, changeInput, changeStyles} from "@/store/actions";
import {defaultStyles} from "@/constants";
import {parse} from "@core/utils";

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
        return createTable(this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const initialCell = this.$element.get('[data-id="0:0"]')
        this.selectCell(initialCell)

        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.changeInput(value)
        })

        this.$on('formula:enter', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:button', (styles) => {
            this.selection.addStyles(styles)
            this.dispatch(applyStyles( this.selection.ids(), styles))
        })
    }

    selectCell = cell => {
        this.selection.select(cell)
        this.$emit('table:select', cell)

        const styles = cell.getStyles(Object.keys(defaultStyles))
        this.dispatch(changeStyles(styles))

    }

    resize = async e => {
        const data = await resizeHandler(this.$element, e)
        this.dispatch(actions.createTable(data))
    }

    onMousedown = e => {
        if (shouldResize(e)) {
            this.resize(e)
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

    changeInput = (value) => {
        this.dispatch(changeInput({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput = e => {
        this.changeInput($(e.target).text())
    }
}