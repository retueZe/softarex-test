import { SearchFilter } from '../app/slices'
import { formatPhotoOrientation } from './PhotoOrientation'
import { formatPhotoSize } from './PhotoSize'

export function createSearchUrl(filter: SearchFilter): string {
    if (filter.query === null) return '/'

    const searchParams = new URLSearchParams()
    searchParams.append('q', filter.query)
    
    if (filter.orientation !== null)
        searchParams.append('orientation', formatPhotoOrientation(filter.orientation))
    if (filter.size !== null)
        searchParams.append('size', formatPhotoSize(filter.size))
    if (filter.color !== null)
        searchParams.append('color', filter.color)

    return `/search?${searchParams.toString()}`
}
