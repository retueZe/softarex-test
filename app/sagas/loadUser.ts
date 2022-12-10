import { put } from 'redux-saga/effects'
import { Theme, userSlice } from '../slices'

const THEME_MAP: Readonly<Record<string, Theme>> = {
    'light': Theme.LIGHT
}

export default function* loadUserSaga() {
    const language = localStorage.getItem('user.language')
    const formattedTheme = localStorage.getItem('user.theme')
    const theme = formattedTheme === null ? null : THEME_MAP[formattedTheme] ?? null

    if (language !== null && (language === 'en-US' || language === 'ru-RU'))
        yield put(userSlice.actions.languageChanged(language))
    if (theme !== null)
        yield put(userSlice.actions.themeChanged(theme))
}
