import { Theme } from '../app/slices'

const INPUT_MAP: Readonly<Record<string, Theme>> = {
    'LIGHT': Theme.LIGHT
}
const FORMATTED_VALUES: Readonly<Record<Theme, string>> = {
    [Theme.LIGHT]: 'light'
}

export function parseTheme(input: string): Theme | null {
    return INPUT_MAP[input.toUpperCase()] ?? null
}
export function formatTheme(value: Theme): string {
    return FORMATTED_VALUES[value]
}
