import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery } from 'redux-saga/effects'
import { formatTheme } from '../../utils'
import { ChangeRequest, LocalizationLanguage, Theme } from '../slices'

export default function* storeUserSaga() {
    yield takeEvery('user/languageChanged', storeLanguageSaga)
    yield takeEvery('user/themeChanged', storeThemeSaga)
}
function* storeLanguageSaga({payload}: PayloadAction<ChangeRequest<LocalizationLanguage>>) {
    const value = typeof payload === 'string' ? payload : payload.value
    const storeChanges = typeof payload === 'string' ? true : payload.storeChanges ?? true

    if (!storeChanges) return

    localStorage.setItem('user.language', value)
}
function* storeThemeSaga({payload}: PayloadAction<ChangeRequest<Theme>>) {
    const value = typeof payload === 'number' ? payload : payload.value
    const storeChanges = typeof payload === 'number' ? true : payload.storeChanges ?? true

    if (!storeChanges) return

    localStorage.setItem('user.theme', formatTheme(value))
}
