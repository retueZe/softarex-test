import React, { CSSProperties } from 'react'
import '../styles/PhotoView.sass'
import { usePhotos, useScrollPosition } from '../app/hooks'
import { Photo } from '../app/api'
import UserAvatarView from './UserAvatarView'
import { downloadImage } from '../utils'

export type PhotoViewProps = {
    index: number
    photo: Photo
}

const PhotoView: React.FC<PhotoViewProps> = ({photo}) => {
    useScrollPosition()
    const [, photos] = usePhotos()
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
    const onDownload = (event: React.MouseEvent) => {
        event.preventDefault()
        downloadImage(photo.src.original)
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
                    <a className='PhotoView-download' onClick={onDownload}>
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
