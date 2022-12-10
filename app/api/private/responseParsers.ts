import { ApiCallError, ApiCallResponse, Photo } from '../abstraction'

export type ApiCallUnparsedResponse = ApiCallError | {
    photos: UnparsedPhoto[]
    total_results: number
    page: number
    per_page: number
    next_page?: string
    prev_page?: string
}
type UnparsedPhoto = {
    id: number
    width: number
    height: number
    url: string
    photographer: string
    photographer_url: string
    photographer_id: number
    src: {
        original: string
        large2x: string
        large: string
        medium: string
    }
    liked: boolean
    alt: string
}

export function parseResponse(response: ApiCallUnparsedResponse): ApiCallResponse {
    if ('status' in response) return createErrorResponse(response)

    return {
        photos: response?.photos?.map(parsePhoto),
        totalCount: response.total_results,
        page: response.page,
        perPage: response.per_page,
        previousPage: response.prev_page ?? null,
        nextPage: response.next_page ?? null,
        error: null
    }
}
function createErrorResponse(error: ApiCallError): ApiCallResponse {
    return {
        error,
        photos: [],
        page: 0,
        perPage: 0,
        totalCount: 0,
        nextPage: null,
        previousPage: null
    }
}
function parsePhoto(response: UnparsedPhoto): Photo {
    return {
        id: response.id,
        url: response.url,
        width: response.width,
        height: response.height,
        photographer: response.photographer,
        photographerId: response.photographer_id,
        photographerUrl: response.photographer_url,
        src: response.src,
        isLiked: response.liked,
        alt: response.alt
    }
}
