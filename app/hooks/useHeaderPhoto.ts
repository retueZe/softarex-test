import useSlice from './useSlice'
import headerPhoto from '../slices/headerPhoto'

export default function useHeaderPhoto() {
    return useSlice(headerPhoto, state => state.photo)
}
