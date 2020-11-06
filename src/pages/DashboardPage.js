import {Page} from "@/pages/Page";
import {$} from "@core/dom";
import {storage} from "@core/utils";

export class DashboardPage extends Page {
    count = 1

    toHtml = (table) => {
        const tableData = storage(table)
        const number = table.split(':')[1]
        const date = new Date(tableData.date)
        const title = tableData.title !== 'Новая таблица' ? tableData.title : `${tableData.title} ${this.count++}`

        return `
            <li class="db__record">
                <a href="#excel/${number}">
                    ${title}
                </a>
                <strong>
                    ${date.toLocaleDateString()}&nbsp;&nbsp;&nbsp;
                    ${date.toLocaleTimeString()}
                </strong>
            </li>
        `
    }

    getTables() {
        const keys = []
        for (let i = 0; i < localStorage.length; i++) {
            if (!localStorage.key(i).includes('excel')) {
                continue
            }

            keys.push(localStorage.key(i))
        }

        return keys
    }

    createTableList() {
        const tables = this.getTables()

        if (tables.length === 0) {
            return `<p class="db__empty">Вы пока не создали ни одной таблицы</p>`
        }

        return `
            <div class="db__list-header">
                <span>Название</span>
                <span>Дата создания</span>
            </div>

            <ul class="db__list">
                ${tables.map(this.toHtml).join('')}
            </ul>
        `
    }

    getRoot() {
        const now = Date.now().toString()

        return $.create('div', 'db').html(`
            <div class="db__header">
                <h1>Excel Header</h1>
            </div>

            <div class="db__new">
                <div class="db__wrapper">
                    <div class="db__create">
                        <a href="#excel/${now}">Новая <br /> таблица</a>
                    </div>
                </div>
            </div>

            <div class="db__table db__wrapper">
                   ${this.createTableList()}
            </div>
        `)
    }
}