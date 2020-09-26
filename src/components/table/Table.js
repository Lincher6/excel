import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.createTable";
import {$} from "@core/dom";
import {getThrottleFunction} from "@core/utils";

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
            const cells = this.$element.getAll(`[data-col="${parent.data.col}"`)
            const type = resizer.data.resize

            document.onmousemove = getThrottleFunction(e => {
                console.log(1)
                if (type === 'col') {
                    const delta = e.pageX - coords.right
                    const width = delta + coords.width
                    parent.css({width: width + 'px'})
                    cells.forEach(cell => { cell.style.width = width + 'px' })
                } else {
                    const delta = e.pageY - coords.bottom
                    const height = delta + coords.height
                    parent.css({height: height + 'px'})
                }

            }, 20)

            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}