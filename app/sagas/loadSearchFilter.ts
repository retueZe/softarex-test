import { put } from 'redux-saga/effects'
import { parsePhotoOrientation, parsePhotoSize } from '../../utils'
import { searchFilterSlice } from '../slices'

export default function* loadSearchFilterSaga() {
    const searchParams = new URL(document.URL).searchParams
    const query = searchParams.get('q')

    if (query === null) return

    const orientation = parsePhotoOrientation(searchParams.get('orientation') ?? '')
    const size = parsePhotoSize(searchParams.get('size') ?? '')
    const color = searchParams.get('color')

    yield put(searchFilterSlice.actions.queryChanged(query))
    yield put(searchFilterSlice.actions.orientationChanged(orientation))
    yield put(searchFilterSlice.actions.sizeChanged(size))
    yield put(searchFilterSlice.actions.colorChanged(color))
}
