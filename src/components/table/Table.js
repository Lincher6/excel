import { ExcelComponent } from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.createTable";

export class Table extends ExcelComponent {
    constructor($element) {
        super($element)
    }

    static className = 'excel__table'

    toHTML() {
        return createTable()
    }
}