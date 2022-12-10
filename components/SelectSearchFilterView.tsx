import React from 'react'
import '../styles/SelectSearchFilterView.sass'
import { useLocalizationString, usePhotos, useSearchFilter } from '../app/hooks'
import SearchFilterView from './SearchFilterView'
import MaskedIcon from './MaskedIcon'
import { PhotoOrientation, PhotoSize } from '../app/api'
import { useNavigate } from 'react-router-dom'
import { createSearchUrl, formatPhotoOrientation, formatPhotoSize } from '../utils'
import { SearchFilter } from '../app/slices'

type OptionProps = {
    name: SelectSearchFilterName
    index: number
    select?: boolean
    filterSelected?: boolean
    selected?: boolean
}
export type SelectSearchFilterViewProps = {
    name: SelectSearchFilterName
}
interface SelectSearchFilterTypeMap {
    'orientation': PhotoOrientation
    'size': PhotoSize
}
export type SelectSearchFilterName = keyof SelectSearchFilterTypeMap
type OptionsInfo = {
    [N in SelectSearchFilterName]: {
        values: (SelectSearchFilterTypeMap[N] | null)[],
        formatter: (value: SelectSearchFilterTypeMap[N]) => string
    }
}

const OPTIONS_INFO: OptionsInfo = {
    'orientation': {
        values: [
            null,
            PhotoOrientation.HORIZONTAL,
            PhotoOrientation.VERTICAL,
            PhotoOrientation.SQUARE
        ],
        formatter: formatPhotoOrientation
    },
    'size': {
        values: [
            null,
            PhotoSize.LARGE,
            PhotoSize.MEDIUM,
            PhotoSize.SMALL
        ],
        formatter: formatPhotoSize
    }
}

const Option: React.FC<OptionProps> = ({name, index}) => {
    const [photos, photosSlice] = usePhotos()
    const [filter, filterSlice] = useSearchFilter()
    const value = OPTIONS_INFO[name].values[index]
    //??? TODO: wtf
    const formattedValue = value === null ? 'any' : OPTIONS_INFO[name].formatter(value as never)
    const localizedValue = useLocalizationString(`SearchFilter.${name}.${formattedValue}` as any)
    const navigate = useNavigate()
    const iconUrl = value === null ? null : `/assets/${name}/${formattedValue}.svg`
    let className = 'SelectSearchFilterView-Option'

    if (value === filter[name])
        className += ' SelectSearchFilterView-Option-selected'

    const newFilter: SearchFilter = {
        ...filter,
        [name]: value
    }
    const buttonClickHandler = () => {
        filterSlice.dispatch(`${name}Changed`, value)
        photosSlice.dispatch('cleared')
        photosSlice.dispatch('downloadingRequested')

        navigate(createSearchUrl(newFilter))
    }

    return (
        <button className={className} onClick={buttonClickHandler}>
            <div>
                <MaskedIcon color={value === null ? 'none' : undefined} maskUrl={iconUrl}/>
                <span>{localizedValue}</span>
            </div>
            <div></div>
        </button>
    )
}

const SelectSearchFilterView: React.FC<SelectSearchFilterViewProps> = ({name}) => {
    const [filter, _] = useSearchFilter()
    const selectedValue = filter[name] ?? null
    const formattedSelectedValue = selectedValue === null ? 'any' : OPTIONS_INFO[name].formatter(selectedValue as never)
    const selectedIndex = OPTIONS_INFO[name].values.indexOf(selectedValue as any)
    const localizedSelectedValue = useLocalizationString(`SearchFilter.${name}.${formattedSelectedValue}` as any)
    const selectedIconColor = selectedValue === null ? 'none' : '#b0b0b0'
    const selectedIconMaskUrl = selectedValue === null ? undefined : `/assets/${name}/${formattedSelectedValue}.svg`

    return (
        <SearchFilterView customFilter={selectedValue !== null} content={localizedSelectedValue}
            icon={<MaskedIcon color={selectedIconColor} maskUrl={selectedIconMaskUrl}/>}>
            {() => Array.from({length: OPTIONS_INFO[name].values.length}, (_, i) => (
                <Option name={name} index={i} key={i}
                    selected={Math.abs(i - selectedIndex) < 0.5}/>))}
        </SearchFilterView>
    )
}
export default SelectSearchFilterView
