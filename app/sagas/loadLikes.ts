import { PayloadAction, Slice } from '@reduxjs/toolkit'
import { put, takeEvery } from 'redux-saga/effects'
import { parseLikeList } from '../../utils'
import { ApiCallResponse } from '../api'
import { photosSlice } from '../slices'

export default function* loadLikesSaga() {
    yield takeEvery('photos/downloaded', loadLikesCoreSaga)
}
function* loadLikesCoreSaga({payload}: PayloadAction<Readonly<ApiCallResponse>>) {
    const formattedLikes = localStorage.getItem('likes')
    const likes = formattedLikes === null ? [] : parseLikeList(formattedLikes) ?? []

    for (const photo of payload.photos)
        if (likes.includes(photo.id))
            yield put(photosSlice.actions.modified({
                value: {...photo, isLiked: true},
                storeChanges: false
            }))
}
type SliceState<S> = S extends Slice<infer T> ? T : never
