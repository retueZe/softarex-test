import React, { CSSProperties, useState } from 'react'
import '../styles/PhotoView.sass'
import { usePhotos, useScrollPosition } from '../app/hooks'
import { Photo } from '../app/api'
import Icon from './Icon'
import UserAvatarView from './UserAvatarView'

export type PhotoViewProps = {
    index: number
    photo: Photo
}

const PhotoView: React.FC<PhotoViewProps> = ({photo}) => {
    useScrollPosition()
    const [_, photos] = usePhotos()
    let likeButtonClass = 'PhotoView-like-button'

    if (photo.isLiked)
        likeButtonClass += ' PhotoView-liked'

    const style: CSSProperties = {
        aspectRatio: `${photo.width} / ${photo.height}`
    }
    const onLikeButtonClick = () => {
        const modifiedPhoto: Photo = {...photo, isLiked: !photo.isLiked}

        photos.dispatch('modified', modifiedPhoto)
    }

    return (
        <div className='PhotoView' style={style}>
            <div className='PhotoView-background'></div>
            <div className='PhotoView-overlay'>
                <div>
                    <a href={photo.photographerUrl} target='_blank'>
                        <div>
                            <UserAvatarView name={photo.photographer}/>
                            <span>{photo.photographer}</span>
                        </div>
                    </a>
                </div>
                <div>
                    <a className='PhotoView-download' href={photo.url} download>
                        <div>{/* icon */}</div>
                    </a>
                    <button className={likeButtonClass} onClick={onLikeButtonClick}>
                        <div>{/* icon */}</div>
                    </button>
                </div>
            </div>
            <img src={photo.src.large2x} alt={photo.alt}/>
        </div>
    )
}
export default PhotoView
