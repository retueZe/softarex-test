import React, { useState } from 'react'
import '../styles/ColorSearchFilterView.sass'
import SearchFilterView from './SearchFilterView'
import { useLocalizationString, usePhotos, useSearchFilter } from '../app/hooks'
import MaskedIcon from './MaskedIcon'
import ColorPicker from './ColorPicker'
import { useNavigate } from 'react-router-dom'
import { Color, createSearchUrl, formatRgbColor, hsvToRgb } from '../utils'

const ColorSearchFilterView: React.FC = () => {
    const [filter, filterSlice] = useSearchFilter()
    const [, photosSlice] = usePhotos()
    const selectedColor = filter.color
    const anyColorString = useLocalizationString('SearchPage.filter.color.any')
    const navigate = useNavigate()
    const [colorContainer] = useState<[Color | null]>([null])
    const onColorPicked = (color: Color | null): void => {
        const formattedColor = color === null
            ? null
            : formatRgbColor(hsvToRgb(color))
        
        filterSlice.dispatch('colorChanged', formattedColor)
        photosSlice.dispatch('cleared')
        photosSlice.dispatch('downloadingRequested')

        navigate(createSearchUrl({...filter, color: formattedColor}))
    }
    const createColorChangedHandler = (collapse: () => void) => (color: Color | null): void => {
        if (colorContainer[0] === null && color === null) {
            collapse()

            return
        }

        colorContainer[0] = color

        if (color === null) {
            onColorPicked(null)

            return
        }
    }

    return (
        <SearchFilterView content={selectedColor ?? anyColorString} customFilter={selectedColor !== null}
            icon={<MaskedIcon color={selectedColor ?? 'none'} circle/>}
            onCollapsed={() => onColorPicked(colorContainer[0])}>
            {collapse => (
                <div className='ColorSearchFilterView-container'>
                    <ColorPicker onChanged={createColorChangedHandler(collapse)}/>
                </div>
            )}
        </SearchFilterView>
    )
}
export default ColorSearchFilterView
