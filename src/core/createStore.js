export const createStore = (rootReducer, initialState = {}) => {
    const state = rootReducer(initialState, { type: '__INIT__' })
    const listeners = []

    return {
        subscribe(fn) {
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners.filter(listener => listener !== fn )
                }
            }
        },

        dispatch(action) {
            rootReducer(state, action)
            listeners.forEach(listener => listener())
        },

        getSTate() {
            return state
        }
    }
}