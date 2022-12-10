import { PayloadAction } from '@reduxjs/toolkit'
import { ChangeRequest } from '../app/slices'

export type ChangeAction<S, P> = (state: S, action: PayloadAction<P>) => S
export type StoringChangeAction<S, T> = ChangeAction<S, ChangeRequest<T>>

export function createChangeAction<S, K extends keyof S>(key: K): ChangeAction<S, S[K]> {
    return (state, {payload}: PayloadAction<S[K]>) => state[key] === payload
        ? state
        : {...state, [key]: payload}
}
export function createStoringChangeAction<S, K extends keyof S>(key: K): StoringChangeAction<S, S[K]> {
    return (state, {payload}: PayloadAction<ChangeRequest<S[K]>>) => {
        const value = typeof payload === 'object' && 'value' in payload ? payload.value : payload

        return state[key] === value
            ? state
            : {...state, [key]: value}
    }
}
