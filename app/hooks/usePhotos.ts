import photos from '../slices/photos'
import useSlice from './useSlice'

export default function usePhotos() {
    return useSlice(photos, photos => photos.value)
}
