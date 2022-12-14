import { CategoriesMenuReferenceName } from '../components/CategoriesMenuReference'

const URLS: Readonly<Record<CategoriesMenuReferenceName, string>> = {
    'search': '/',
    'videos': 'https://pexels.com/videos',
    'leaderboard': 'https://pexels.com/leaderboard',
    'challenges': 'https://pexels.com/challenges'
}

export function provideCategoriesMenuReferenceUrl(name: CategoriesMenuReferenceName) {
    return URLS[name]
}
