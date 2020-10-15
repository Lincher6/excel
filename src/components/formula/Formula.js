import {ExcelComponent} from "@core/ExcelComponent";
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($element, options) {
        super($element, {
            name: 'formula',
            listeners: ['input', 'keydown'],
            subscribes: ['currentValue'],
            ...options
        })
    }

    init() {
        super.init();

        this.formulaInput = $('#formula-input')

        this.$on('table:select', cell => {
            this.formulaInput.text(cell.text())
        })
    }

    storeChanged(changes) {
        this.formulaInput.text(changes.currentValue)
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula-input" class="content" contenteditable spellcheck="false"></div>
        `
    }

    onInput = (e) => {
        this.$emit('formula:input', e.target.textContent.trim())
    }

    onKeydown = e => {
        const keys = ['Enter', 'Tab']
        if (keys.includes(e.key)) {
            e.preventDefault()
            this.$emit('formula:enter')
        }
    }
}