export const capitalize = (staring) => {
    if (typeof staring !== 'string') {
        return ''
    }

    return staring.charAt(0).toUpperCase() + staring.slice(1)
}