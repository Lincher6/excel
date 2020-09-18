import { ExcelComponent } from "@core/ExcelComponent";

export class Table extends ExcelComponent {
    constructor($element) {
        super($element)
    }

    static className = 'excel__table'

    toHTML() {
        return `
            <div class="row">

                <div class="row-info">

                </div>

                <div class="data">

                    <div class="column-info">
                        A
                    </div>
                    <div class="column-info">
                        B
                    </div>
                    <div class="column-info">
                        C
                    </div>

                </div>

            </div>

            <div class="row">

                <div class="row-info">
                    1
                </div>

                <div class="data">
                    <div class="cell selected" contenteditable>
                        abc
                    </div>
                    <div class="cell" contenteditable>
                        abc
                    </div>
                    <div class="cell" contenteditable>
                        abc
                    </div>
                </div>

            </div>
        `
    }
}