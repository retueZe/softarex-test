import useSlice from './useSlice'
import searchFilter from '../slices/searchFilter'

export default function useSearchFilter() {
    return useSlice(searchFilter)
}
