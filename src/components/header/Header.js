import {$} from "@core/dom";
import {changeTitle} from "@/store/actions";
import {defaultTitle} from "@/constants";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {getTableName} from "@core/utils";
import {ActiveRoute} from "@core/Routes/ActiveRoute";

export class Header extends ExcelStateComponent {
    static className = 'excel__header'

    constructor($element, options) {
        super($element, {
            name: 'header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    onInput = e => {
        const target = $(e.target)
        this.dispatch(changeTitle(target.text()))
    }

    onClick = e => {
        const target = $(e.target)
        if (target.data.button === 'remove') {
            localStorage.removeItem(getTableName())
            ActiveRoute.navigate('#')
        }

    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input type="text" class="input" value='${title}' />

            <div>
                <div class="button" data-button="remove">
                    <i class="material-icons" data-button="remove">delete</i>
                </div>
                <div class="button">
                    <a href="#">
                        <i class="material-icons">exit_to_app</i>
                    </a>
                </div>
            </div>
        `
    }

}