import { errorsSlice } from '../slices'
import useSlice from './useSlice'

export default function useErrors() {
    return useSlice(errorsSlice, state => state.value)
}
