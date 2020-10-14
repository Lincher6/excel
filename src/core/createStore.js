export const createStore = (rootReducer, initialState = {}) => {
    let state = rootReducer(initialState, { type: '__INIT__' })
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
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
        },

        getState() {
            return state
        }
    }
}