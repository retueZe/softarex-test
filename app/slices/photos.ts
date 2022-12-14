import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { withAddedPhotos } from '../../utils'
import { ApiCallResponse, Photo } from '../api'
import { ChangeRequest, PhotosSliceState } from './interfaces'

export const DEFAULT_PAGE_CAPACITY = 12
export const MAX_PAGE_CAPACITY = 80

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        value: {},
        order: [],
        pageCapacity: DEFAULT_PAGE_CAPACITY,
        currentPageNumber: 1,
        totalCount: 0,
        isDownloadingRequested: false,
        hasDownloadedAtLeastOnce: false,
        error: null
    } as PhotosSliceState,
    reducers: {
        pageCapacityChanged: (state, {payload}: PayloadAction<number>) => {
            payload = Math.floor(payload ?? DEFAULT_PAGE_CAPACITY)

            if (state.currentPageNumber > 0.5)
                throw new Error('Page capacity cannot be changed until list is empty.')
            if (payload < 0.5 || payload > MAX_PAGE_CAPACITY + 0.5) throw new Error('Payload is out of range.')
            if (Math.abs(state.pageCapacity - payload) < 0.5) return state

            return {...state, pageCapacity: payload}
        },
        downloadingRequested: state => !state.isDownloadingRequested &&
            (state.order.length < state.totalCount - 0.5 ||
            (state.totalCount < 0.5 && !state.hasDownloadedAtLeastOnce))
            ? {...state, error: null, isDownloadingRequested: true}
            : state,
        downloaded: (state, {payload}: PayloadAction<Readonly<ApiCallResponse>>) => payload.error === null
            ? {
                ...state,
                value: withAddedPhotos(state.value, payload.photos),
                order: [...state.order, ...payload.photos.map(photo => photo.id)],
                currentPageNumber: state.currentPageNumber + 1,
                totalCount: state.currentPageNumber < 1.5
                    ? payload.totalCount
                    : state.totalCount,
                isDownloadingRequested: false,
                hasDownloadedAtLeastOnce: true
            } : {
                ...state,
                error: payload.error,
                isDownloadingRequested: false,
                hasDownloadedAtLeastOnce: true
            },
        cleared: state => state.order.length > 0.5 || state.hasDownloadedAtLeastOnce ? {
            ...state,
            value: {},
            order: [],
            currentPageNumber: 1,
            totalCount: 0,
            hasDownloadedAtLeastOnce: false
        } : state,
        modified: (state, {payload}: PayloadAction<ChangeRequest<Photo>>) => {
            const photo = 'id' in payload ? payload : payload.value
            const valueCopy: Record<number, Photo> = {...state.value}
            valueCopy[photo.id] = photo

            return {...state, value: valueCopy}
        }
    }
})
export default photosSlice
