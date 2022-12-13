import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HeaderPhotoSliceState } from '.'
import { ApiCallError, Photo } from '../api'

const headerPhotoSlice = createSlice({
    name: 'headerPhoto',
    initialState: {
        photo: null,
        isDownloadingRequested: false,
        error: null
    } as HeaderPhotoSliceState,
    reducers: {
        downloadingRequested: state =>
            state.isDownloadingRequested || state.photo !== null
                ? state
                : {...state, error: null, isDownloadingRequested: true},
        downloaded: (state, {payload}: PayloadAction<Photo | ApiCallError>) => state.photo !== null
            ? state
            : {
                ...state,
                photo: 'status' in payload ? state.photo : payload,
                error: 'status' in payload ? payload : state.error,
                downloadingRequest: null
            },
        cleared: state => state.photo === null
            ? state
            : {...state, photo: null}
    }
})
export default headerPhotoSlice
