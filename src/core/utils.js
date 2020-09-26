export const capitalize = (staring) => {
    if (typeof staring !== 'string') {
        return ''
    }

    return staring.charAt(0).toUpperCase() + staring.slice(1)
}

export const getThrottleFunction = (func, delay) => {
    let timerId

    return (...e) => {
        if (timerId) {
            return
        }

        timerId = setTimeout(() => {
            func(...e)
            timerId = undefined;
        }, delay)
    }

}