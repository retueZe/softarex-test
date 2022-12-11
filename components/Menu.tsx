import React from 'react'
import '../styles/Menu.sass'
import Logo from './Logo'
import LanguagePicker from './LanguagePicker'
import SearchBar from './SearchBar'

const Menu: React.FC<MenuProps> = ({searchBarRef, backgroundOpacity, fixed}) => {
    fixed ??= false

    return (
        <div className={`Menu${fixed ? ' Menu-fixed' : ''}`}>
            <div className='Menu-background' style={{opacity: backgroundOpacity}}></div>
            <Logo/>
            <SearchBar searchBarRef={searchBarRef}/>
            <div>{/* placeholder */}</div>
            <LanguagePicker options={['en-US', 'ru-RU']}/>
        </div>
    )
}
export default Menu
export type MenuProps = {
    searchBarRef?: React.RefObject<HTMLFormElement>
    backgroundOpacity?: number
    fixed?: boolean
}
