import { useEffect, useState } from 'react'

export default function useScrollPosition(): ScrollPositionSnapshot {
    // array to create new references on every change
    const [position, setPosition] = useState([0])
    useEffect(() => {
        const handler = () => setPosition([scrollY])

        addEventListener('scroll', handler, {passive: true})
        addEventListener('resize', handler, {passive: true})

        return () => {
            removeEventListener('scroll', handler)
            removeEventListener('resize', handler)
        }
    }, [])

    return positionToSnapshot(position[0])
}
export type ScrollPositionSnapshot = {
    offset: number
    percentage: number
    hasReachedTop: boolean
    hasReachedBottom: boolean
    hasReachedPosition: ScrollPositionChecker
}
export type ScrollPositionChecker =
    (value: number, unit?: ScrollPositionUnit | null, direction?: ScrollReachDirection | null) => boolean
export type ScrollPositionUnit = 'px' | '%'
export type ScrollReachDirection = 'top' | 'bottom'

function positionToSnapshot(position: number): ScrollPositionSnapshot {
    position = Math.floor(position)
    const viewportHeight = innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const maxPosition = documentHeight - viewportHeight

    return {
        offset: position,
        percentage: position / maxPosition,
        hasReachedTop: position < 0.5,
        hasReachedBottom: maxPosition - position < 0.5,
        hasReachedPosition: positionChecker.bind(undefined, position, maxPosition, viewportHeight)
    }
}
function positionChecker(
    position: number,
    maxPosition: number,
    viewportHeight: number,
    value: number,
    unit?: ScrollPositionUnit | null,
    direction?: ScrollReachDirection | null
): boolean {
    unit ??= 'px'
    direction ??= 'top'
    let offset = Math.floor(unit === 'px'
        ? value
        : value * maxPosition)
    offset -= direction === 'top'
        ? 0
        : viewportHeight

    return position > offset - 0.5
}
