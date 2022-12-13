import { Slice } from '@reduxjs/toolkit'
import { put, select, takeLeading } from 'redux-saga/effects'
import { ApiCallResponse, makeApiCall } from '../api'
import { photosSlice, searchFilterSlice } from '../slices'

export const DEFAULT_TIMEOUT = 5000
export default function* downloadPhotosSaga() {
    yield takeLeading('photos/downloadingRequested', downloadPhotosCoreSaga)
}
function* downloadPhotosCoreSaga() {
    const state = (yield select())
    const photos: SliceState<typeof photosSlice> = state.photos
    const filter: SliceState<typeof searchFilterSlice> = state.searchFilter

    if (!photos.isDownloadingRequested) return

    const response: ApiCallResponse = filter.query === null
        ? yield makeApiCall('/v1/curated', {
            page: photos.currentPageNumber,
            perPage: photos.pageCapacity
        }, {cache: true})
        : yield makeApiCall('/v1/search', {
            page: photos.currentPageNumber,
            perPage: photos.pageCapacity,
            query: filter.query,
            orientation: filter.orientation,
            size: filter.size,
            color: filter.color
        }, {cache: true})
    
    yield put(photosSlice.actions.downloaded(response))
}
type SliceState<S> = S extends Slice<infer T> ? T : never
