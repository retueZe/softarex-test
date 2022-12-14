import React from 'react'
import { Photo } from '../app/api'
import PhotoView, { PhotoViewProps } from '../components/PhotoView'

export function buildPhotoListViewColumnChildren(
    photos: Readonly<Record<number, Photo>>,
    order: readonly number[]
): React.FunctionComponentElement<PhotoViewProps>[][] {
    const columnCount = innerHeight / innerWidth > 1
        ? innerHeight / innerWidth > 4 / 3
            ? 1
            : 2
        : 3
    const columnChildren: React.FunctionComponentElement<PhotoViewProps>[][] =
        Array.from({length: columnCount}, () => [])
    const columnHeights = Array.from({length: columnCount}, () => 0)

    for (let i = 0; i < order.length; i++) {
        const photo = photos[order[i]]
        let columnIndex = 0

        for (let j = 1; j < columnHeights.length; j++)
            if (columnHeights[j] < columnHeights[columnIndex])
                columnIndex = j
        
        const photoView = React.createElement(PhotoView, {photo: photo, index: i, key: i})
        columnChildren[columnIndex].push(photoView)
        columnHeights[columnIndex] += photo.height / photo.width
    }

    return columnChildren
}
