import React, { useRef } from 'react'
// import '../styles/ColorSearchFilterView.sass'
import SearchFilterView from './SearchFilterView'
import { useLocalizationString, usePhotos, useSearchFilter } from '../app/hooks'
import MaskedIcon from './MaskedIcon'
import ColorPicker from './ColorPicker'
import { useNavigate } from 'react-router-dom'
import { createSearchUrl } from '../utils'

const ColorSearchFilterView: React.FC = () => {
    const [filter, filterSlice] = useSearchFilter()
    const [_, photosSlice] = usePhotos()
    const selectedColor = filter.color
    const anyColorString = useLocalizationString('SearchPage.filter.color.any')
    const navigate = useNavigate()
    const onColorPicked = (): void => {
        const color = colorPickerRef.current!.value
        filterSlice.dispatch('colorChanged', color)
        photosSlice.dispatch('cleared')
        photosSlice.dispatch('downloadingRequested')

        navigate(createSearchUrl({...filter, color: color}))
    }
    const colorPickerRef = useRef<HTMLInputElement>(null)
    const onExpanded = (): void => {
        colorPickerRef.current!.click()
    }

    return (
        <SearchFilterView content={selectedColor ?? anyColorString} customFilter={selectedColor !== null}
            icon={<MaskedIcon color={selectedColor ?? 'none'} circle/>}
            onExpanded={onExpanded} onCollapsed={onColorPicked}>
            {() => (<ColorPicker inputRef={colorPickerRef}/>)}
        </SearchFilterView>
    )
}
export default ColorSearchFilterView
