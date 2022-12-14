import React from 'react'
import { useLocalizationString } from '../app/hooks'
import { LocalizationString } from '../app/slices'
import '../styles/CategoriesMenuReference.sass'
import { provideCategoriesMenuReferenceUrl } from '../utils'

export type CategoriesMenuReferenceProps = {
    name: CategoriesMenuReferenceName
    selected?: boolean
}
export type CategoriesMenuReferenceName = 'search' | 'videos' | 'leaderboard' | 'challenges'

const CategoriesMenuReference: React.FC<CategoriesMenuReferenceProps> = ({name, selected}) => {
    selected ??= false
    const url = provideCategoriesMenuReferenceUrl(name)
    const displayName = useLocalizationString(`CategoriesMenuReference.${name}` as LocalizationString)

    return (
        <a className={`CategoriesMenuReference${selected ? ' CategoriesMenuReference-selected' : ''}`} href={url}>
            {displayName}
        </a>
    )
}
export default CategoriesMenuReference
