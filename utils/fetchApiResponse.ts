import { ApiCallUnparsedResponse } from '../app/api/private/responseParsers'
import API_KEY from '../assets/apikey.json'

export async function fetchApiResponse(url: URL, cache: boolean): Promise<ApiCallUnparsedResponse> {
    const request = new Request(url, {
        headers: [
            ['Authorization', API_KEY]
        ]
    })
    const fetchResponse = cache
        ? await cachedFetch(request)
        : await fetch(request)

    if (!fetchResponse.ok) return {
        status: fetchResponse.status,
        statusText: fetchResponse.statusText
    }

    return fetchResponse.json()
}
async function cachedFetch(request: RequestInfo): Promise<Response> {
    const cache = await caches.open('api')
    const cachedResponse = await cache.match(request) ?? null

    if (cachedResponse !== null) return cachedResponse

    const fetchResponse = await fetch(request)

    if (!fetchResponse.ok) return fetchResponse

    await cache.put(request, fetchResponse!)

    return (await cache.match(request))!
}
