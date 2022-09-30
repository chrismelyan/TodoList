import {rootReducer, store} from "../app/store";
import {FieldsErrorType} from "../api/types";

export type AppRootStoreType = ReturnType<typeof rootReducer>
export type AppDispatchType = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorType> } }
