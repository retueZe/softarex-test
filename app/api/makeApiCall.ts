import { call, CallEffect } from 'redux-saga/effects'
import { fetchApiResponse } from '../../utils'
import {
    ApiCallPath,
    ApiCallPathNotRequRequiringParameter,
    ApiCallPathRequiringParameter,
    ApiCallParameterTypeMap,
    ApiCallResponse
} from './interfaces'
import { formatParameter } from './private/formatParameter'
import { ApiCallUnparsedResponse, parseResponse } from './private/responseParsers'

type MakeApiCallResult = Generator<CallEffect<any>, ApiCallResponse, ApiCallUnparsedResponse>
export type MakeApiCallOptions = Partial<{
    cache?: boolean | null
}>

export function makeApiCall<P extends ApiCallPathRequiringParameter>(
    path: P,
    parameter: ApiCallParameterTypeMap[P],
    options?: MakeApiCallOptions | null
): MakeApiCallResult
export function makeApiCall<P extends ApiCallPathNotRequRequiringParameter>(
    path: P,
    parameter?: ApiCallParameterTypeMap[P] | null,
    options?: MakeApiCallOptions | null
): MakeApiCallResult
export function* makeApiCall<P extends ApiCallPath>(
    path: P,
    parameter?: ApiCallParameterTypeMap[P] | null,
    options?: MakeApiCallOptions | null
): MakeApiCallResult {
    const cache = options?.cache ?? false
    const url = new URL(`https://api.pexels.com${path}${formatParameter(path, parameter)}`)
    const response = yield call(fetchApiResponse, url, cache)

    return parseResponse(response)
}
