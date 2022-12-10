import { formatPhotoSize } from '../../../utils'
import { ApiCallPath, ApiCallParameterTypeMap, PhotoOrientation } from '../abstraction'

type QueryPairs = [string, string][]
type ApiCallParameterFormatter<P extends ApiCallPath> =
    (parameter: ApiCallParameterTypeMap[P], pairs: QueryPairs) => void
type ApiCallParameterFormatters = {
    [P in ApiCallPath]: ApiCallParameterFormatter<P>
}

const API_CALL_PARAMETER_FORMATTERS: Readonly<ApiCallParameterFormatters> = {
    '/v1/curated': (parameter, pairs) => {
        if (typeof parameter.page === 'number')
            pairs.push(['page', `${parameter.page}`])
        if (typeof parameter.perPage === 'number')
            pairs.push(['per_page', `${parameter.perPage}`])
    },
    '/v1/search': (parameter, pairs) => {
        API_CALL_PARAMETER_FORMATTERS['/v1/curated'](parameter, pairs)

        pairs.push(['query', parameter.query])

        if (typeof parameter.orientation === 'number')
            pairs.push(['orientation', FORMATTED_ORIENTATIONS[parameter.orientation]])
        if (typeof parameter.size === 'number')
            pairs.push(['size', formatPhotoSize(parameter.size)])
        if (typeof parameter.color === 'string')
            pairs.push(['color', encodeURIComponent(parameter.color)])
    }
}
const FORMATTED_ORIENTATIONS: Readonly<Record<PhotoOrientation, string>> = {
    [PhotoOrientation.HORIZONTAL]: 'landscape',
    [PhotoOrientation.VERTICAL]: 'portrait',
    [PhotoOrientation.SQUARE]: 'square'
}

function concatQueryPairs(pairs: QueryPairs): string {
    if (pairs.length < 0.5) return ''

    return '?' + pairs
        .map(pair => `${pair[0]}=${pair[1]}`)
        .join('&')
}
export function formatParameter<P extends ApiCallPath>(path: P, parameter?: ApiCallParameterTypeMap[P] | null): string {
    if (typeof parameter === 'undefined' || parameter === null) return ''

    const pairs: QueryPairs = []
    API_CALL_PARAMETER_FORMATTERS[path](parameter, pairs)

    return concatQueryPairs(pairs)
}
