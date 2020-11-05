import {Page} from "@/pages/Page";
import {$} from "@core/dom";

export class DashboardPage extends Page {

    toHtml(element) {
        return `
            <li class="db__record">
                <a href="#">
                    Номер 1
                </a>
                <strong>
                    12.12.2020
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
        return `
            <div class="db__list-header">
                <span>Название</span>
                <span>Дата создания</span>
            </div>

            <ul class="db__list">
                ${this.getTables().map(this.toHtml).join('')}
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