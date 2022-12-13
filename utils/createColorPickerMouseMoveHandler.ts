import React from 'react'
import { Color } from './color'

export type CreateColorPickerMouseMoveHandlerContext = {
    hue: number
    saturation: number
    brightness: number
    isBarCaptured: boolean
    isMapCaptured: boolean
    barRef: React.RefObject<HTMLDivElement>
    mapRef: React.RefObject<HTMLDivElement>
    barPointerRef: React.RefObject<HTMLDivElement>
    mapPointerRef: React.RefObject<HTMLDivElement>
    setIsBarCaptured: (value: boolean) => void
    setIsMapCaptured: (value: boolean) => void
    setHue: (value: number) => void
    setSaturation: (value: number) => void
    setBrightness: (value: number) => void
    onChanged?: (color: Color | null) => void
}
export type ColorPickerMouseMoveEvent = Pick<MouseEvent, 'clientX' | 'clientY' | 'buttons'>
export type MouseMoveHandler = (event: ColorPickerMouseMoveEvent) => void

export function createColorPickerMouseMoveHandler(context: CreateColorPickerMouseMoveHandlerContext): MouseMoveHandler {
    const {
        hue, saturation, brightness, isBarCaptured, isMapCaptured, barRef, mapRef, barPointerRef, mapPointerRef,
        setIsBarCaptured, setIsMapCaptured, setHue, setBrightness, setSaturation, onChanged
    } = context
    const mouseMoveHandler: MouseMoveHandler = event => {
        const mouseX = event.clientX
        const mouseY = event.clientY
        let newHue: number | null = null
        let newSaturation: number | null = null
        let newBrightness: number | null = null
        let hasChanged = true

        if (isBarCaptured) {
            const barY = Math.floor(barRef.current!.getBoundingClientRect().y)
            const barH = barRef.current!.offsetHeight

            setHue((mouseY - barY) / barH)

            if (mouseY < barY) {
                setHue(0)
                barPointerRef.current!.style.top = ''
            } else if (mouseY < barY + barH) {
                newHue = (mouseY - barY) / barH
                setHue(newHue)
                barPointerRef.current!.style.top = `${Math.floor(newHue * barH - 8)}px`
            } else {
                setHue(1)
                barPointerRef.current!.style.top = `${barH - 8}px`
            }
            if ((event.buttons & 1) === 0) setIsBarCaptured(false)
        } else if (isMapCaptured) {
            const mapRect = mapRef.current!.getBoundingClientRect()
            const mapX = Math.floor(mapRect.x)
            const mapY = Math.floor(mapRect.y)
            const mapW = Math.floor(mapRect.width)
            const mapH = Math.floor(mapRect.height)

            if (mouseX < mapX) {
                setSaturation(0)
                mapPointerRef.current!.style.left = ''
            } else if (mouseX < mapX + mapW) {
                newSaturation = (mouseX - mapX) / mapW
                setSaturation(newSaturation)
                mapPointerRef.current!.style.left = `${Math.floor(newSaturation * mapW - 8)}px`
            } else {
                setSaturation(1)
                mapPointerRef.current!.style.left = `${Math.floor(mapW - 8)}px`
            }
            if (mouseY < mapY) {
                setBrightness(1)
                mapPointerRef.current!.style.top = ''
            } else if (mouseY < mapY + mapH) {
                newBrightness = 1 - (mouseY - mapY) / mapH
                setBrightness(newBrightness)
                mapPointerRef.current!.style.top = `${Math.floor((1 - newBrightness) * mapH - 8)}px`
            } else {
                setBrightness(0)
                mapPointerRef.current!.style.top = `${Math.floor(mapH - 8)}px`
            }
            if ((event.buttons & 1) === 0) setIsMapCaptured(false)
        } else
            hasChanged = false
        if (hasChanged && typeof onChanged === 'function' &&
            (newHue !== null || newSaturation !== null || newBrightness !== null))
            onChanged([
                newHue ?? hue,
                newSaturation ?? saturation,
                newBrightness ?? brightness
            ])
    }

    return mouseMoveHandler
}
