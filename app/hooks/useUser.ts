import userSlice from '../slices/user'
import useSlice from './useSlice'

export default function useUser() {
    return useSlice(userSlice)
}
