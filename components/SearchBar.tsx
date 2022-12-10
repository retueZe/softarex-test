import React from 'react'
import '../styles/SearchBar.sass'
import { useLocalizationString } from '../app/hooks'

export type SearchBarProps = {
    searchBarRef?: React.RefObject<HTMLFormElement>
}

const SearchBar: React.FC<SearchBarProps> = ({searchBarRef}) => {
    const searchBarPlaceholder = useLocalizationString('Menu.search-bar.placeholder')

    return (
        <form className='SearchBar' ref={searchBarRef} action='search'>
            <div>
                <input name='q' type='text' placeholder={searchBarPlaceholder}
                    defaultValue={new URL(document.URL).searchParams.get('q') ?? ''}/>
                <button>
                    <div>{/* icon */}</div>
                </button>
            </div>
        </form>
    )
}
export default SearchBar
