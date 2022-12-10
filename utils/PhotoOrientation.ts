import { PhotoOrientation } from '../app/api'

const INPUT_MAP: Readonly<Record<string, PhotoOrientation>> = {
    'HORIZONTAL': PhotoOrientation.HORIZONTAL,
    'VERTICAL': PhotoOrientation.VERTICAL,
    'SQUARE': PhotoOrientation.SQUARE
}
const FORMATTED_VALUES: Readonly<Record<PhotoOrientation, string>> = {
    [PhotoOrientation.HORIZONTAL]: 'horizontal',
    [PhotoOrientation.VERTICAL]: 'vertical',
    [PhotoOrientation.SQUARE]: 'square'
}

export function parsePhotoOrientation(input: string): PhotoOrientation | null {
    return INPUT_MAP[input.toUpperCase()] ?? null
}
export function formatPhotoOrientation(value: PhotoOrientation): string {
    return FORMATTED_VALUES[value]
}
