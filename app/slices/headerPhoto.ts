import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiCallError, Photo } from '../api'

const headerPhotoSlice = createSlice({
    name: 'headerPhoto',
    initialState: {
        photo: null as Photo | null,
        isDownloadingRequested: false
    },
    reducers: {
        downloadingRequested: state =>
            state.isDownloadingRequested || state.photo !== null
                ? state
                : {...state, isDownloadingRequested: true},
        downloaded: (state, {payload}: PayloadAction<Photo | ApiCallError>) => state.photo !== null
            ? state
            : {
                ...state,
                photo: 'status' in payload ? state.photo : payload,
                downloadingRequest: null
            },
        cleared: state => state.photo === null
            ? state
            : {...state, photo: null}
    }
})
export default headerPhotoSlice
