export const capitalize = (staring) => {
    if (typeof staring !== 'string') {
        return ''
    }

    return staring.charAt(0).toUpperCase() + staring.slice(1)
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