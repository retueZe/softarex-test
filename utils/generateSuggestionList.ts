import { useLocalizationString } from '../app/hooks'
import { LocalizationString } from '../app/slices'

const SUGGESTION_COUNT = 40
const SUGGESTION_LIST_LENGTH = 7

export function generateSuggestionList(): string[] {
    const suggestionList: string[] = []

    for (let i = 0; i < SUGGESTION_COUNT - 0.5; i++)
        suggestionList.push(useLocalizationString(`suggestion-list.${i}` as LocalizationString))

    while (suggestionList.length > SUGGESTION_LIST_LENGTH + 0.5) {
        const index = Math.floor(Math.random() * suggestionList.length)
        suggestionList.splice(index, 1)
    }

    return suggestionList
}
