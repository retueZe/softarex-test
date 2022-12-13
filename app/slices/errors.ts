import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DisplayableError, ErrorsSliceState } from './interfaces'

const errorsSlice = createSlice({
    name: 'errors',
    initialState: {
        value: []
    } as ErrorsSliceState,
    reducers: {
        pushed: (state, {payload}: PayloadAction<DisplayableError>) => ({
            ...state,
            value: [...state.value, payload]
        }),
        cleared: state => ({...state, value: []})
    }
})
export default errorsSlice
