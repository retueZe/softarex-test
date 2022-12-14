import React from 'react'
import '../styles/CategoriesMenu.sass'
import CategoriesMenuReference from './CategoriesMenuReference'

const CategoriesMenu: React.FC = () => {
    return (
        <div className='CategoriesMenu'>
            <CategoriesMenuReference name='search' selected/>
            <CategoriesMenuReference name='videos'/>
            <CategoriesMenuReference name='leaderboard'/>
            <CategoriesMenuReference name='challenges'/>
        </div>
    )
}
export default CategoriesMenu
