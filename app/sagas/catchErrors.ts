import { PayloadAction } from '@reduxjs/toolkit'
import { put, takeEvery } from 'redux-saga/effects'
import { ApiCallError, ApiCallResponse, Photo } from '../api'
import { DisplayableErrorCode, errorsSlice } from '../slices'

export default function* catchErrorsSaga() {
    yield takeEvery('photos/downloaded', catchDownloadPhotosErrorSaga)
    yield takeEvery('headerPhoto/downloaded', catchDownloadHeaderPhotoErrorSaga)
}
function* catchDownloadPhotosErrorSaga({payload}: PayloadAction<ApiCallResponse>) {
    if (payload.error === null) return

    yield put(errorsSlice.actions.pushed({
        code: DisplayableErrorCode.HTTP_ERROR | payload.error.status,
        messageInsertions: [statusTextToMessageInsertion(payload.error.statusText)]
    }))
}
function* catchDownloadHeaderPhotoErrorSaga({payload}: PayloadAction<Photo | ApiCallError>) {
    if ('id' in payload) return

    yield put(errorsSlice.actions.pushed({
        code: DisplayableErrorCode.HTTP_ERROR | payload.status,
        messageInsertions: [statusTextToMessageInsertion(payload.statusText)]
    }))
}
function statusTextToMessageInsertion(value: string): string {
    return value.length < 0.5 ? value : ' ' + value
}
