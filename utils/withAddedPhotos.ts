import { Photo } from '../app/api'

export function withAddedPhotos(
    source: Readonly<Record<number, Photo>>,
    photos: readonly Photo[]
): Record<number, Photo> {
    const sourceCopy = {...source}

    for (const photo of photos)
        sourceCopy[photo.id] = photo

    return sourceCopy
}
