import LOCALIZATION from  '../../assets/localization.json'
import { PhotoOrientation, PhotoSize, UserAvatar } from '../api'

export type LocalizationLanguage = keyof typeof LOCALIZATION
export type LocalizationString = keyof typeof LOCALIZATION['en-US']
export enum Theme {
    LIGHT
}
export type User = {
    language: LocalizationLanguage
    theme: Theme
}
export type ChangeRequest<T> = T | {
    value: T
    storeChanges?: boolean | null
}

export type UserAvatarDownloadRequest = {
    id: number
}
export type UserAvatarDownloadSucceededResponse = {
    id: number
    avatar: UserAvatar
}
export type UserAvatarDownloadFailedResponse = {
    id: number
    error: Error
}

export type SearchFilter = {
    query: string | null,
    orientation: PhotoOrientation | null,
    size: PhotoSize | null,
    color: string | null
}

export type DisplayableError = {
    code: DisplayableErrorCode
    messageInsertions: string[]
}
export enum DisplayableErrorCode {
    HTTP_ERROR = 0x8000_0000,
    TOO_MANY_REQUESTS = HTTP_ERROR | 429,
    INTERNAL_SERVER_ERROR = HTTP_ERROR | 500
}

// stub
export default ()=>{}
