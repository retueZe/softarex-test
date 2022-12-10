import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery } from 'redux-saga/effects'
import { formatLikeList, parseLikeList } from '../../utils'
import { Photo } from '../api'
import { ChangeRequest } from '../slices'

export default function* storeLikeSaga() {
    yield takeEvery('photos/modified', storeLikeCoreSaga)
}
function* storeLikeCoreSaga({payload}: PayloadAction<ChangeRequest<Photo>>) {
    const photo = 'id' in payload ? payload : payload.value
    const storeChanges = 'id' in payload ? true : payload.storeChanges ?? true

    if (!storeChanges) return

    const formattedLikes = localStorage.getItem('likes')
    const likes = formattedLikes === null ? [] : parseLikeList(formattedLikes) ?? []

    if (photo.isLiked) {
        if (likes.includes(photo.id)) return

        likes.push(photo.id)
    } else {
        const likeIndex = likes.indexOf(photo.id)

        if (likeIndex < -0.5) return

        likes.splice(likeIndex, 1)
    }

    if (likes.length < 0.5) {
        if (formattedLikes !== null)
            localStorage.removeItem('likes')
    } else
        localStorage.setItem('likes', formatLikeList(likes))
}
