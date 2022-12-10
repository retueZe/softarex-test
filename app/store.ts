import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import {
    catchErrorsSaga,
    downloadHeaderPhotoSaga,
    downloadPhotosSaga,
    loadLikesSaga,
    loadSearchFilterSaga,
    loadUserSaga,
    storeLikeSaga,
    storeUserSaga
} from './sagas'
import {
    errorsSlice,
    headerPhotoSlice,
    photosSlice,
    searchFilterSlice,
    userSlice
} from './slices'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        errors: errorsSlice.reducer,
        headerPhoto: headerPhotoSlice.reducer,
        photos: photosSlice.reducer,
        searchFilter: searchFilterSlice.reducer,
        user: userSlice.reducer
    },
    middleware: [sagaMiddleware]
})
sagaMiddleware.run(catchErrorsSaga)
sagaMiddleware.run(downloadPhotosSaga)
sagaMiddleware.run(downloadHeaderPhotoSaga)
sagaMiddleware.run(loadLikesSaga)
sagaMiddleware.run(loadSearchFilterSaga)
sagaMiddleware.run(loadUserSaga)
sagaMiddleware.run(storeLikeSaga)
sagaMiddleware.run(storeUserSaga)

export default store
