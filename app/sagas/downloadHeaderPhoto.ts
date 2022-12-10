import { put, takeLeading } from 'redux-saga/effects'
import { ApiCallResponse, makeApiCall, PhotoSize } from '../api'
import headerPhotoSlice from '../slices/headerPhoto'
import headerPhoto from '../slices/headerPhoto'

export default function* downloadHeaderPhotoSaga() {
    yield takeLeading('headerPhoto/downloadingRequested', downloadHeaderPhotoCoreSaga)
}
function* downloadHeaderPhotoCoreSaga(): Generator<any, void, ApiCallResponse> {
    const query = 'winter'
    const firstResponse = yield makeApiCall('/v1/search', {
        query: query,
        perPage: 0,
        size: PhotoSize.LARGE
    })

    if (firstResponse.error !== null) {
        yield put(headerPhotoSlice.actions.downloaded(firstResponse.error))

        return
    }

    const secondResponse = yield makeApiCall('/v1/search', {
        query: query,
        perPage: 1,
        page: Math.floor(Math.random() * (firstResponse.totalCount - 1) + 1),
        size: PhotoSize.LARGE
    })

    if (secondResponse.error !== null) {
        yield put(headerPhotoSlice.actions.downloaded(secondResponse.error))

        return
    }

    yield put(headerPhoto.actions.downloaded(secondResponse.photos[0]))
}
