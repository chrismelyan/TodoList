import {RequestStatusType, slice} from "./app-reducer";
import {appActions} from "../CommonActions/App";

type InitialAppStateType = {
    error: null | string
    status: RequestStatusType
    isInitialized: boolean
}

const appReducer = slice.reducer
const {setAppError, setAppStatus} = appActions

let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppError({error: 'some error'}))

    expect(endState.error).toBe('some error');
})
test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading');
})