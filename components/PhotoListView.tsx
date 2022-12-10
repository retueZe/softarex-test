import React, { CSSProperties, useState } from 'react'
import '../styles/PhotoListView.sass'
import { usePhotos, useScrollPosition } from '../app/hooks'
import { buildPhotoListViewColumnChildren } from '../utils'

const PhotoListView: React.FC = () => {
    const [photos, photosSlice] = usePhotos()
    const photosOrder = photosSlice.state.order
    const scrollPosition = useScrollPosition()

    //!
    // TODO
    if (scrollPosition.hasReachedPosition(0.8, '%', 'bottom')) {
        photosSlice.dispatch('downloadingRequested')
    }
    
    const columnChildren = buildPhotoListViewColumnChildren(photos, photosOrder)
    const hideLoadingContainer = photosSlice.state.hasDownloadedAtLeastOnce &&
        photosOrder.length > photosSlice.state.totalCount - 0.5

    return (
        <div className='PhotoListView'>
            <div>
                {columnChildren.map((children, i) => <div key={i}>{children}</div>)}
            </div>
            <div className={hideLoadingContainer ? 'collapsed' : undefined}>
                <img src='/assets/loading.gif'/>
            </div>
        </div>
    )
}
export default PhotoListView
