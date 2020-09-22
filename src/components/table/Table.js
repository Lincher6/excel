import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.createTable";
import {$} from "@core/dom";

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
        if (e.target.dataset.resize) {
            const resizer = $(e.target)
            const parent = resizer.closest('[data-type="resizable"]')
            const coords = parent.getCoords()

            document.onmousemove = e => {
                const delta = e.pageX - coords.right
                const width = delta + coords.width
                parent.$element.style.width = width + 'px'
            }

            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}