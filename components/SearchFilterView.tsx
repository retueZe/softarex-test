import React, { ReactNode, useRef, useState } from 'react'
import '../styles/SearchFilterView.sass'
import MaskedIcon from './MaskedIcon'
import FilterButton from './FilterButton'

export type SearchFilterViewProps = {
    icon: React.FunctionComponentElement<typeof MaskedIcon>
    content?: string
    customFilter?: boolean
    children?: (collapse: () => void) => ReactNode,
    onExpanded?: () => void
    onCollapsed?: () => void
}

const SearchFilterView: React.FC<SearchFilterViewProps> = (props) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const collapse = () => {
        (document.activeElement as HTMLElement).blur()
        setIsExpanded(false)
    }
    const children = typeof props.children === 'undefined'
        ? undefined
        : props.children(collapse)
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonClickHandler = () => {
        setIsExpanded(!isExpanded)

        if (!isExpanded) {
            if (typeof props.onExpanded === 'function') props.onExpanded()
        } else if (typeof props.onCollapsed === 'function')
            props.onCollapsed()
    }
    const buttonBlurHandler = () => {
        for (const element of document.querySelectorAll(':hover'))
            if (element === menuRef.current)
                return

        collapse()
        
        if (typeof props.onCollapsed === 'function') props.onCollapsed()
    }

    return (
        <div className='SearchFilterView'>
            <FilterButton icon={props.icon} selected={props.customFilter}
                onClick={buttonClickHandler} onBlur={buttonBlurHandler}>
                {props.content}
            </FilterButton>
            <div ref={menuRef} className={isExpanded ? undefined : 'hidden'}
                onMouseDown={event => event.preventDefault()}>
                {children}
            </div>
        </div>
    )
}
export default SearchFilterView
