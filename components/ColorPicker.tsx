import React, { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocalizationString } from '../app/hooks'
import '../styles/ColorPicker.sass'
import { Color, ColorPickerMouseMoveEvent, createColorPickerMouseMoveHandler, formatRgbColor, hsvToRgb } from '../utils'

export type ColorPickerProps = {
    onChanged?: (color: Color | null) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({onChanged}) => {
    const [hue, setHue] = useState(0)
    const [saturation, setSaturation] = useState(0)
    const [brightness, setBrightness] = useState(1)
    const [pointerComputationsEvent, setPointerComputationsEvent] = useState<ColorPickerMouseMoveEvent | null>(null)
    const mapOverlayRef = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const hueOnlyColor = hsvToRgb([hue, 1, 1])
        const hueOnlyFormattedColor = formatRgbColor(hueOnlyColor)
        const fullColor = hsvToRgb([hue, saturation, brightness])
        const fullFormattedColor = formatRgbColor(fullColor)

        mapOverlayRef.current!.style.background = hueOnlyFormattedColor
        barPointerRef.current!.style.background = hueOnlyFormattedColor
        mapPointerRef.current!.style.background = fullFormattedColor
    })
    const [isBarCaptured, setIsBarCaptured] = useState(false)
    const [isMapCaptured, setIsMapCaptured] = useState(false)
    const barRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<HTMLDivElement>(null)
    const barPointerRef = useRef<HTMLDivElement>(null)
    const mapPointerRef = useRef<HTMLDivElement>(null)
    const mouseMoveHandler = createColorPickerMouseMoveHandler({
        hue, saturation, brightness, isBarCaptured, isMapCaptured, barRef, mapRef, barPointerRef, mapPointerRef,
        setIsBarCaptured, setIsMapCaptured, setHue, setSaturation, setBrightness, onChanged
    })
    const createMouseDownHandler = (setIsCaptured: (value: boolean) => void) => (event: React.MouseEvent): void => {
        setIsCaptured(true)
        setPointerComputationsEvent(event)
    }
    useEffect(() => {
        addEventListener('mousemove', mouseMoveHandler)

        return () => {
            removeEventListener('mousemove', mouseMoveHandler)
        }
    })
    const presenterStyle: CSSProperties = {
        background: formatRgbColor(hsvToRgb([hue, saturation, brightness]))
    }
    const resetString = useLocalizationString('ColorPicker.reset')
    const resetButtonClickHandler = (): void => {
        setHue(0)
        setSaturation(0)
        setBrightness(1)
        barPointerRef.current!.style.top = ''
        mapPointerRef.current!.style.left = ''
        mapPointerRef.current!.style.top = ''
        
        if (typeof onChanged === 'function') onChanged(null)
    }

    if (pointerComputationsEvent !== null) {
        mouseMoveHandler(pointerComputationsEvent)
        setPointerComputationsEvent(null)
    }

    return (
        <div className='ColorPicker'>
            <div>
                <div ref={mapRef} onMouseDown={createMouseDownHandler(setIsMapCaptured)}>
                    <div ref={mapOverlayRef} className='ColorPicker-overlay'></div>
                    <img src='/assets/ColorPicker/map.png'/>
                    <div ref={mapPointerRef} className='ColorPicker-pointer'></div>
                </div>
                <div ref={barRef} onMouseDown={createMouseDownHandler(setIsBarCaptured)}>
                    <img src='/assets/ColorPicker/bar.png'/>
                    <div ref={barPointerRef} className='ColorPicker-pointer'></div>
                </div>
            </div>
            <div>
                <div style={presenterStyle}></div>
                <button onClick={resetButtonClickHandler}>{resetString}</button>
            </div>
        </div>
    )
}
export default ColorPicker
