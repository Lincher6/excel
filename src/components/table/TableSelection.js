export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select(element) {
        this.clear()
        this.group.push(element)
        element.focus().addClass(TableSelection.className)
        this.current = element
    }

    clear() {
        this.group.forEach(cell => {
            cell.removeClass(TableSelection.className)
        })
        this.group = []
    }

    selectGroup(elements = []) {
        this.clear()
        this.group = elements
        elements.forEach(element => {
            element.addClass(TableSelection.className)
        })

    }

}