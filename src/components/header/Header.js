import {$} from "@core/dom";
import {changeTitle} from "@/store/actions";
import {defaultTitle} from "@/constants";
import {ExcelStateComponent} from "@core/ExcelStateComponent";

export class Header extends ExcelStateComponent {
    static className = 'excel__header'

    constructor($element, options) {
        super($element, {
            name: 'header',
            listeners: ['input'],
            ...options
        })
    }

    onInput = e => {
        const target = $(e.target)
        this.dispatch(changeTitle(target.text()))
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input type="text" class="input" value='${title}' />

            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `
    }

}