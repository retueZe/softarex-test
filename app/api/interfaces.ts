export type Photo = {
    id: number
    width: number
    height: number
    url: string
    photographer: string
    photographerUrl: string
    photographerId: number
    src: {
        original: string
        large2x: string
        large: string
        medium: string
    }
    isLiked: boolean
    alt: string
}
export type UserAvatar = {
    medium: string
    small: string
}
export enum PhotoOrientation {
    HORIZONTAL,
    VERTICAL,
    SQUARE
}
export enum PhotoSize {
    LARGE,
    MEDIUM,
    SMALL
}

export interface ApiCallParameterTypeMap {
    '/v1/curated': ApiCuratedCallParameter
    '/v1/search': ApiSearchCallParameter
}
export type ApiCallPath = keyof ApiCallParameterTypeMap
export type ApiCallParameter = ApiCallParameterTypeMap[ApiCallPath]
export type ApiCuratedCallParameter = Partial<{
    page: number | null
    perPage: number | null
}>
export type ApiSearchCallParameter =
    & ApiCuratedCallParameter
    & {query: string}
    & Partial<{
        orientation: PhotoOrientation | null
        size: PhotoSize | null
        color: string | null
    }>
export type ApiCallPathRequiringParameter = '/v1/search'
export type ApiCallPathNotRequRequiringParameter = Exclude<ApiCallPath, ApiCallPathRequiringParameter>
export type ApiCallResponse = {
    photos: Photo[]
    totalCount: number
    page: number
    perPage: number
    nextPage: string | null
    previousPage: string | null
    error: ApiCallError | null
}
export type ApiCallError = {
    status: number
    statusText: string
}

// stub
export default ()=>{}
