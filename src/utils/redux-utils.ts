import {useDispatch} from "react-redux";
import {AppDispatchType} from "../app/store";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export function useActions<T extends ActionCreatorsMapObject<any>>(action: T) {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(action, dispatch)
    }, [])

    return boundActions
}