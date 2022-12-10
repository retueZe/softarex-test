import { createSlice } from '@reduxjs/toolkit'
import { createStoringChangeAction } from '../../utils'
import { Theme, User } from './abstraction'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        language: 'en-US',
        theme: Theme.LIGHT
    } as User,
    reducers: {
        languageChanged: createStoringChangeAction('language'),
        themeChanged: createStoringChangeAction('theme')
    }
})
export default userSlice
