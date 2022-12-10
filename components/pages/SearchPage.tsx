import React, { useState } from 'react'
import '../../styles/pages/SearchPage.sass'
import NoHeaderLayout from '../layouts/NoHeader'
import { useLocalizationString, usePhotos, useSearchFilter, useUser } from '../../app/hooks'
import ColorSearchFilterView from '../ColorSearchFilterView'
import PhotoListView from '../PhotoListView'
import SelectSearchFilterView from '../SelectSearchFilterView'
import { initPage } from '../../utils'
import FilterButton from '../FilterButton'
import MaskedIcon from '../MaskedIcon'

const SearchPage: React.FC = () => {
    const [_, photosSlice] = usePhotos()
    const [filter, filterSlice] = useSearchFilter()
    const resultsFormat = photosSlice.state.hasDownloadedAtLeastOnce
        ? photosSlice.state.totalCount > 0.5
            ? useLocalizationString('SearchPage.results')
            : useLocalizationString('SearchPage.no-results')
        : null

    // stub
    if (resultsFormat === null) useLocalizationString('SearchPage.results')

    const filtersString = useLocalizationString('SearchPage.filters')
    const [filtersExpanded, setFiltersExpanded] = useState(false)
    const formattedTotalCount = formatTotalCount(photosSlice.state.totalCount)
    const results = resultsFormat
        ?.replace('%0', filter.query ?? '')
        ?.replace('%1', formattedTotalCount)
        ?? ''
    const headerClass = `SearchPage-header${resultsFormat === null
        ? ' collapsed'
        : ' SearchPage-header-expanded'}`

    initPage('SearchPage')

    return (
        <NoHeaderLayout>
            <main className='SearchPage'>
                <div className={headerClass}>
                    <div>
                        <h1>{results}</h1>
                        <FilterButton selected={filtersExpanded}
                            icon={<MaskedIcon color='#b0b0b0' maskUrl='/assets/filters.svg'/>}
                            onClick={() => setFiltersExpanded(!filtersExpanded)}>
                            {filtersString}
                        </FilterButton>
                    </div>
                    <div className={filtersExpanded ? undefined : 'collapsed'}>
                        <div><SelectSearchFilterView name='orientation'/></div>
                        <div><SelectSearchFilterView name='size'/></div>
                        <div><ColorSearchFilterView/></div>
                    </div>
                </div>
                <div><PhotoListView/></div>
            </main>
        </NoHeaderLayout>
    )
}
export default SearchPage

function formatTotalCount(totalCount: number): string {
    let postfix = ''
    const [user, _] = useUser()
    const postfixes: string[] = [
        useLocalizationString('postfix.thousands'),
        useLocalizationString('postfix.millions'),
        useLocalizationString('postfix.billions')
    ]

    for (const _postfix of postfixes) {
        if (totalCount < 1000) break

        totalCount = totalCount / 1000
        postfix = _postfix
    }

    totalCount = totalCount < 100
        ? Math.floor(totalCount * 10) / 10
        : Math.floor(totalCount)

    return totalCount.toLocaleString(user.language) + postfix
}
