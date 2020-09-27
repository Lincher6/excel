import {$} from "@core/dom";
import {getThrottleFunction} from "@core/utils";

export const resize = ($element, e) => {
    const resizer = $(e.target)
    const parent = resizer.closest('[data-type="resizable"]')
    const coords = parent.getCoords()
    const cells = $element.getAll(`[data-col="${parent.data.col}"`)
    const type = resizer.data.resize
    const cssType = type === 'col' ? 'bottom' : 'right'

    resizer.css({
        opacity: 1,
        [cssType]: `-5000px`
    })

    document.onmousemove = getThrottleFunction(e => {
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

    }, 10)

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        resizer.css({
            opacity: 0,
            [cssType]: 0
        })
    }
}

export const shouldResize = e => {
    return e.target.dataset.resize
}