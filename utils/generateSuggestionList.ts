const SUGGESTION_LIST_LENGTH = 7
const SUGGESTIONS: readonly string[] = [
    'Nature',
    'Dark',
    'Auto',
    'Tech',
    'Christmas',
    'Winter',
    'Sunset',
    'Art',
    'Landscape',
    'Office',
    'Animal',
    'House',
    'Abstract',
    'Coffee',
    'Flowers',
    'Sky',
    'Forest',
    'Dog',
    'Space',
    'City',
    'Cat',
    'Tea',
    'Relationship',
    'Friendship',
    'Family',
    'Summer',
    'Fall',
    'Spring',
    'Pizza',
    'Cookie',
    'Childhood',
    'Village',
    'Football',
    'Baseball',
    'Beer',
    'Moment',
    'Room',
    'People',
    'Science',
    'Midnight'
]

export function generateSuggestionList(): string[] {
    const suggestionList = [...SUGGESTIONS]

    while (suggestionList.length > SUGGESTION_LIST_LENGTH + 0.5) {
        const index = Math.floor(Math.random() * suggestionList.length)
        suggestionList.splice(index, 1)
    }

    return suggestionList
}
