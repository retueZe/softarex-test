import { useLocalizationString, useUser } from '../app/hooks'
import '../themes/index.sass'
import { formatTheme } from './Theme'

export type PageName = 'IndexPage' | 'SearchPage'

export function initPage(pageName: PageName): void {
    const titlePostfix = useLocalizationString(`${pageName}.title-postfix`)
    const [user] = useUser()

    document.getElementsByTagName('title')[0].innerText = `PEXELS CLONE — ${titlePostfix}`
    document.getElementsByTagName('html')[0].classList.add(`theme-${formatTheme(user.theme)}`)
}
