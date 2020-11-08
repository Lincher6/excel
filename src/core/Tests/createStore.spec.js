import {createStore} from "../createStore";

const initialState = {
    count: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === "ADD") {
        return { ...state, count: state.count + 1 }
    }
    return state
}

describe("TEST", () => {
    let store
    let fn

    beforeEach(() => {
        store = createStore(reducer, initialState)
        fn = jest.fn()
    })

    test('store created', () => {
        expect(store).toBeDefined()
        expect(store.dispatch).toBeDefined()
        expect(store.subscribe).toBeDefined()
        expect(store.getState).not.toBeUndefined()
    })

    test('should return state as object', () => {
        expect(store.getState()).toBeInstanceOf(Object)
    })

    test('should return initial state', () => {
        expect(store.getState()).toEqual(initialState)
    })

    test('should change state with correct action type', () => {
        store.dispatch({type: 'ADD'})

        expect(store.getState().count).toBe(1)
    })

    test('should NOT change state with incorrect action type', () => {
        store.dispatch({type: 'NO TYPE'})

        expect(store.getState().count).toBe(0)
    })

    test('subscriber should be called', () => {
        store.subscribe(fn)
        store.dispatch({type: 'ADD'})

        expect(fn).toHaveBeenCalled()
        expect(fn).toHaveBeenCalledWith(store.getState())
    })

    test('subscriber should NOT be called after unsubscription', () => {
        const sub = store.subscribe(fn)
        sub.unsubscribe()

        store.dispatch({type: 'NO TYPE'})

        expect(fn).not.toHaveBeenCalled()
    })

    test('state changed async', () => {
        return new Promise(resolve => {
            setTimeout(() => {
                store.dispatch({type: 'ADD'})
            }, 500)
            setTimeout(() => {
                expect(store.getState().count).toBe(1)
                resolve()
            }, 1000)
        })
    })
})