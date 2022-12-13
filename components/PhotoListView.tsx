import React from 'react'
import '../styles/PhotoListView.sass'
import { usePhotos, useScrollPosition } from '../app/hooks'
import { buildPhotoListViewColumnChildren } from '../utils'

const PhotoListView: React.FC = () => {
    const [photos, photosSlice] = usePhotos()
    const photosOrder = photosSlice.state.order
    const scrollPosition = useScrollPosition()

    if (scrollPosition.hasReachedPosition(0.8, '%', 'bottom') &&
        photosSlice.state.error === null) {
        photosSlice.dispatch('downloadingRequested')
    }
    
    const columnChildren = buildPhotoListViewColumnChildren(photos, photosOrder)
    const hideLoadingContainer = photosSlice.state.hasDownloadedAtLeastOnce &&
        photosOrder.length > photosSlice.state.totalCount - 0.5
    const columnContainerClass = columnChildren.length < 2.5
        ? columnChildren.length < 1.5
            ? 'PhotoListView-one-column'
            : 'PhotoListView-two-column'
        : undefined

    return (
        <div className='PhotoListView'>
            <div className={columnContainerClass}>
                {columnChildren.map((children, i) => <div key={i}>{children}</div>)}
            </div>
            <div className={hideLoadingContainer ? 'collapsed' : undefined}>
                <img src='/assets/loading.gif'/>
            </div>
        </div>
    )
}
export default PhotoListView
