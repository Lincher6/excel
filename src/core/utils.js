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

export const getThrottleFunction = (func, delay) => {
    let timerId

    return (...e) => {
        if (!timerId) {
            func(...e)
            timerId = setTimeout(() => {
                timerId = undefined;
            }, delay)
        }
    }
}

export const isEqual = (a, b) => {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}