import { MenuReferenceName } from '../components/MenuReference'

const RELATIVE_URLS: Readonly<Record<MenuReferenceName, string>> = {
    'discover': 'discover',
    'license': 'license',
    'upload': 'join-contributor'
}

export function provideMenuReferenceUrl(name: MenuReferenceName): string {
    return `https://pexels.com/${RELATIVE_URLS[name]}`
}
