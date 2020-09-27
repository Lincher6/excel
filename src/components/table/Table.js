import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.createTable.js";
import {resize, shouldResize} from "@/components/table/table.resize";

export class Table extends ExcelComponent {
    constructor($element) {
        super($element, {
            name: "table",
            listeners: ['mousedown']
        })
    }

    static className = 'excel__table'

    toHTML() {
        return createTable()
    }

    onMousedown = e => {
        if (shouldResize(e)) {
            resize(this.$element, e)
        }
    }
}