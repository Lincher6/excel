
export const capitalize = (staring) => {
    if (typeof staring !== 'string') {
        return ''
    }

    return staring.charAt(0).toUpperCase() + staring.slice(1)
}

export const range = (start, end) => {
    if (start > end) {
        [start, end] = [end, start]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

export const storage = (key, value) => {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value))
    }
    return JSON.parse(localStorage.getItem(key))
}

export const getThrottleFunction = (fn, delay) => {
    let timer

    return (...args) => {
        if (!timer) {
            fn(...args)
            timer = setTimeout(() => {
                timer = undefined;
            }, delay)
        }
    }
}

export const debounce = (fn, delay) => {
    let timer

    return (...args) => {
        clearTimeout(timer)
        setTimeout(() => {
            fn(...args)
            clearTimeout(timer)
        }, delay)
    }
}

export const isEqual = (a, b) => {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export const toDashCase = string => {
    return string.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export const toInlineStyles = (styles = {}) => {
    return Object.keys(styles).map(key => {
        return `${[toDashCase(key)]}: ${styles[key]}`
    }).join('; ')
}

export const parse = value => {
    if (value.startsWith('=')) {
        try {
            return eval(value.slice(1))
        }
        catch (e) {
            return value
        }
    }
    return value
}