import React from 'react'
import '../styles/FilterButton.sass'
import MaskedIcon from './MaskedIcon'

export type FilterButtonProps = {
    selected?: boolean
    icon?: React.FunctionComponentElement<typeof MaskedIcon>
    onClick?: () => void
    onBlur?: () => void
    children?: string
}

const FilterButton: React.FC<FilterButtonProps> = ({selected, icon, onClick, onBlur, children}) => {
    let buttonClass = 'FilterButton'
    
    if (selected ?? false) buttonClass += ' FilterButton-selected'

    return (
        <button className={buttonClass} onClick={onClick} onBlur={onBlur}>
            {icon}
            <span>{children}</span>
        </button>
    )
}
export default FilterButton
