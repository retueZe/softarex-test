import { PhotoSize } from '../app/api'

const INPUT_MAP: Readonly<Record<string, PhotoSize>> = {
    'LARGE': PhotoSize.LARGE,
    'MEDIUM': PhotoSize.MEDIUM,
    'SMALL': PhotoSize.SMALL
}
const FORMATTED_VALUES: Readonly<Record<PhotoSize, string>> = {
    [PhotoSize.LARGE]: 'large',
    [PhotoSize.MEDIUM]: 'medium',
    [PhotoSize.SMALL]: 'small'
}

export function parsePhotoSize(input: string): PhotoSize | null {
    return INPUT_MAP[input.toUpperCase()] ?? null
}
export function formatPhotoSize(value: PhotoSize): string {
    return FORMATTED_VALUES[value]
}
