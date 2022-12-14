import React from 'react'
import '../../styles/pages/IndexPage.sass'
import DefaultLayout from '../layouts/Default'
import { useLocalizationString } from '../../app/hooks'
import PhotoListView from '../PhotoListView'
import { initPage } from '../../utils'
import CategoriesMenu from '../CategoriesMenu'

const IndexPage: React.FC = () => {
    const trendingString = useLocalizationString('IndexPage.trending')

    initPage('IndexPage')

    return (
        <DefaultLayout>
            <main className='IndexPage'>
                <div className='IndexPage-categories-menu-container'><CategoriesMenu/></div>
                <h1>{trendingString}</h1>
                <div className='IndexPage-photo-list-container'><PhotoListView/></div>
            </main>
        </DefaultLayout>
    )
}
export default IndexPage
