class Dom {
    constructor(selector) {
        this.$element = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$element.innerHTML = html
            return this
        }
        return this.$element.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$element.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$element.removeEventListener(eventType, callback)
    }

    closest(selector) {
        return $(this.$element.closest(selector))
    }

    getCoords() {
        return this.$element.getBoundingClientRect()
    }

    get(selector) {
        return $(this.$element.querySelector(selector))
    }

    getAll(selector) {
        return this.$element.querySelectorAll(selector)
    }

    get data() {
        return this.$element.dataset
    }

    css(styles = {}) {
        Object.keys(styles).forEach(styleType => {
            this.$element.style[styleType] = styles[styleType]
        })
    }

    getStyles(styles = []) {
        return styles.reduce((acc, key) => {
            acc[key] = this.$element.style[key]
            return acc
        }, {})
    }

    focus() {
        this.$element.focus()
        return this
    }

    text(text) {
        if (typeof text === 'string') {
            this.$element.textContent = text
            return this
        }
        if (this.$element.tagName.toLowerCase() === 'input') {
            return this.$element.value.trim()
        }
        return this.$element.textContent.trim()

    }

    addClass(className) {
        this.$element.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$element.classList.remove(className)
        return this
    }

    id(parse) {
        if (parse) {
            const [row, col] = this.id().split(':')
            return { row: +row, col: +col }
        }
        return this.data.id
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$element
        }

        if (Element.prototype.append) {
            this.$element.append(node)
        }

        else {
            this.$element.appendChild(node)
        }

        return this
    }

}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const element = document.createElement(tagName)
    if (classes) {
        element.classList.add(classes)
    }

    return $(element)
}