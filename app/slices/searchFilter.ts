import { createSlice } from '@reduxjs/toolkit'
import { createChangeAction } from '../../utils'
import { SearchFilter } from './interfaces'

const searchFilterSlice = createSlice({
    name: 'searchFilter',
    initialState: {
        query: null,
        orientation: null,
        size: null,
        color: null
    } as SearchFilter,
    reducers: {
        queryChanged: createChangeAction('query'),
        orientationChanged: createChangeAction('orientation'),
        sizeChanged: createChangeAction('size'),
        colorChanged: createChangeAction('color')
    }
})
export default searchFilterSlice
