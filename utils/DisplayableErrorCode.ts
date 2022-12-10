import { DisplayableErrorCode } from '../app/slices'

const INPUT_MAP: Readonly<Record<string, DisplayableErrorCode>> = {
    'http.429': DisplayableErrorCode.TOO_MANY_REQUESTS,
    'http.500': DisplayableErrorCode.INTERNAL_SERVER_ERROR
}
const FORMATTED_VALUES: Readonly<Record<DisplayableErrorCode, string>> = {
    [DisplayableErrorCode.TOO_MANY_REQUESTS]: 'http.429',
    [DisplayableErrorCode.INTERNAL_SERVER_ERROR]: 'http.500',
}

export function parseDisplayableErrorCode(input: string): DisplayableErrorCode {
    return INPUT_MAP[input] ?? (input.startsWith('http.')
        ? DisplayableErrorCode.HTTP_ERROR
        : 0)
}
export function formatDisplayableErrorCode(value: DisplayableErrorCode): string {
    return FORMATTED_VALUES[value] ?? ((value & DisplayableErrorCode.HTTP_ERROR) === 0
        ? 'unknown'
        : 'http.unknown')
}
