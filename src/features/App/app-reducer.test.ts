import {appReducer, RequestStatusType, setErrorAC, setStatusAC} from "./app-reducer";

type InitialAppStateType = {
    error: null | string
    status: RequestStatusType
    isInitialized: boolean
}
let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setErrorAC({error: 'some error'}))

    expect(endState.error).toBe('some error');
})
test('correct status should be set', () => {
    const endState = appReducer(startState, setStatusAC({status: 'loading'}))

    expect(endState.status).toBe('loading');
})