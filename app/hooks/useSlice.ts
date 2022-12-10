import {
    AnyAction,
    CaseReducer,
    CaseReducerActions,
    CaseReducerWithPrepare,
    PayloadAction,
    Slice,
    SliceCaseReducers
} from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

export function useSlice<
    S = any,
    R extends SliceCaseReducers<S> = SliceCaseReducers<S>,
    N extends string = string
>(slice: Slice<S, R, N>): [S, UsedSlice<S, R, N>]
export function useSlice<
    S = any,
    R extends SliceCaseReducers<S> = SliceCaseReducers<S>,
    N extends string = string,
    U = S
>(slice: Slice<S, R, N>, selector: (state: S) => U): [U, UsedSlice<S, R, N, U>]
/**
 * Adapts {@link slice} to `react`. Result fields:
 * - `name` — the name of the {@link slice}
 * - `state` — contains the selected state
 * - `dispatch` — accepts action type and action payload, returns created action
 */
export default function useSlice<
    S = any,
    R extends SliceCaseReducers<S> = SliceCaseReducers<S>,
    N extends string = string,
    U = S
>(slice: Slice<S, R, N>, selector?: (state: S) => U): [U, UsedSlice<S, R, N, U>] {
    const dispatch = useDispatch()
    const instance: UsedSlice<S, R, N, U> = {
        name: slice.name,
        state: useSelector<any, S>(state => state[slice.name]),
        dispatch: (type, ...args) => {
            const actionCreator = slice.actions[type]

            // CaseReducerWithPrepare обязан по типизации иметь метод prepare, actionCreator может быть void только
            // в том случае, если prepare не расширяет PrepareAction<any> (см. тип _ActionCreatorWithPreparedPayload)
            // таким образом получается противоречие и сценарий, когда actionCreator не является функцией не возможен.
            // Сделал заглушку для TS.
            if (typeof actionCreator !== 'function') throw new Error('')

            return dispatch(actionCreator(args[0]))
        }
    }

    return [useSelector<any, U>(state => {
        if (!(slice.name in state)) throw new Error('This slice is unused for current store.')

        return typeof selector === 'function'
            ? selector(state[slice.name])
            : state[slice.name]
    }), instance]
}
export type UsedSlice<
    S = any,
    R extends SliceCaseReducers<S> = SliceCaseReducers<S>,
    N extends string = string,
    U = S
> = {
    name: N
    state: S
    dispatch: UsedSliceDispatch<S, R, N>
}
export type UsedSliceDispatch<
    S = any,
    R extends SliceCaseReducers<S> = SliceCaseReducers<S>,
    N extends string = string
> =
    <K extends keyof R>(type: K, ...args: ExtractReducerParameters<R, K, S, N>) => AnyAction
type ExtractReducerParameters<
    R extends SliceCaseReducers<S>,
    K extends keyof R,
    S = any,
    N extends string = string
> = R[K] extends CaseReducer<S, PayloadAction<any>>
    ? AnyFriendlyParameters<CaseReducerActions<R, N>[K]>
    : R[K] extends CaseReducerWithPrepare<S, PayloadAction<any, string, any, any>>
        ? Parameters<R[K]['prepare']>
        : never
type AnyFriendlyParameters<T> = T extends (...args: infer P) => any
    ? P
    : never
