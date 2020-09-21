import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
    constructor($element) {
        super($element, {
            name: 'formula',
            listeners: ['input']
        })
    }

    static className = 'excel__formula'

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="content" contenteditable spellcheck="false"></div>
        `
    }

    onInput = () => {
        console.log('hi')
    }
}