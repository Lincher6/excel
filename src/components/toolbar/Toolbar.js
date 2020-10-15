import { ExcelComponent } from "@core/ExcelComponent";
import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";

export class Toolbar extends ExcelComponent {
    constructor($element, options) {
        super($element, {
            name: 'toolbar',
            listeners: ['click'],
            ...options
        })
    }

    static className = 'excel__toolbar'

    toHTML() {
        return createToolbar()
    }

    onClick = e => {
        const target = $(e.target)
        if (target.data.type === 'button') {
            console.log(target.data.value)
        }
    }
}