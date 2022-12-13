import React from 'react'
import '../styles/PhotoAuthorLabel.sass'
import { Photo } from '../app/api'
import { useLocalizationString } from '../app/hooks'

export type PhotoAuthorLabelProps = {
    photo?: Photo | null
}

const PhotoAuthorLabel: React.FC<PhotoAuthorLabelProps> = ({photo}) => {
    photo ??= null
    const photoByString = useLocalizationString('PhotoAuthorLabel.photo-by')

    return (
        <div className={`PhotoAuthorLabel${photo === null ? ' hidden' : ''}`}>
            <a href={photo?.photographerUrl} target='_blank'>
                {photoByString} <span>{photo?.photographer}</span>
            </a>
        </div>
    )
}
export default PhotoAuthorLabel
