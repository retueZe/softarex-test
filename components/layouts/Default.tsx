import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../../styles/layouts/Default.sass'
import { useHeaderPhoto, useLocalizationString, usePpi, useScrollPosition } from '../../app/hooks'
import Menu from '../Menu'
import PhotoAuthorLabel from '../PhotoAuthorLabel'
import NotificationsView from '../NotificationsView'
import SuggestionListView from '../SuggestionListView'

const DefaultLayout: React.FC<{children: ReactNode}> = ({children}) => {
    const scrollPosition = useScrollPosition()
    const ppi = usePpi()
    const welcomeMessage = useLocalizationString('DefaultLayout.welcome')
    // sticky search bar
    //* have to use refs & layout effects because `offsetXXX` props are used here
    const searchBarPlaceholderRef = useRef<HTMLDivElement>(null)
    const searchBarRef = useRef<HTMLFormElement>(null)
    useLayoutEffect(() => {
        const treshold = 0.2 * ppi
        const sbp = searchBarPlaceholderRef.current!
        const sbpY = Math.floor(sbp.getBoundingClientRect().top)
        const searchBarStyle = searchBarRef.current!.style

        if (sbpY < treshold) {
            searchBarStyle.position = ''
            searchBarStyle.left = ''
            searchBarStyle.top = ''
        } else {
            searchBarStyle.position = 'absolute'
            const sbpX = sbp.offsetLeft - searchBarRef.current!.parentElement!.offsetLeft
            const sbpY = sbp.offsetTop - searchBarRef.current!.parentElement!.offsetTop
            searchBarStyle.left = `${sbpX}px`
            searchBarStyle.top = `${sbpY}px`
        }
    })
    // visible menu bg
    const [menuBackgorundOpacity, setMenuBackgroundOpacity] = useState(0)
    useLayoutEffect(() => {
        const firstTreshold = innerWidth > 5 * ppi
            ? searchBarPlaceholderRef.current!.offsetTop - 0.2 * ppi
            : 0
        const secondTreshold = innerWidth > 5 * ppi
            ? Math.max(3 * ppi, 0.6 * innerHeight) - 0.8 * ppi
            : 0.9 * ppi
        const scrollOffset = scrollPosition.offset

        if (scrollOffset < firstTreshold) {
            setMenuBackgroundOpacity(0)
        } else if (scrollOffset < secondTreshold) {
            setMenuBackgroundOpacity((scrollOffset - firstTreshold) / (secondTreshold - firstTreshold))
        } else
            setMenuBackgroundOpacity(1)
    })
    const [headerPhoto, headerPhotoSlice] = useHeaderPhoto()
    useEffect(() => {headerPhotoSlice.dispatch('downloadingRequested')}, [])

    return (
        <div className='DefaultLayout'>
            <div className='DefaultLayout-header'>
                <div>{/* background */}</div>
                <img src={headerPhoto?.src.original ?? ''} className={headerPhoto === null ? 'hidden' : undefined}/>
                <div>{/* placeholder */}</div>
                <div className='DefaultLayout-welcome'>
                    <h1>{welcomeMessage}</h1>
                    <div ref={searchBarPlaceholderRef}>{/* placeholder */}</div>
                    <SuggestionListView/>
                </div>
                <PhotoAuthorLabel photo={headerPhoto}/>
            </div>
            {children}
            <Menu searchBarRef={searchBarRef} backgroundOpacity={menuBackgorundOpacity}/>
            <NotificationsView/>
        </div>
    )
}
export default DefaultLayout
