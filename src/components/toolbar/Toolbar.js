import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constants";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'
    constructor($element, options) {
        super($element, {
            name: 'toolbar',
            listeners: ['click'],
            subscribes: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick = e => {
        const target = $(e.target)
        if (target.data.type === 'button') {
            const value = JSON.parse(target.data.value)

            this.$emit('toolbar:button', value)
        }
    }
}