import React, { useRef } from 'react'
import '../styles/ColorPicker.sass'

export type ColorPickerProps = {
    inputRef?: React.RefObject<HTMLInputElement>
}

const ColorPicker: React.FC<ColorPickerProps> = ({inputRef}) => {
    const ref = inputRef ?? useRef<HTMLInputElement>(null)
    
    return (
        <input type="color" className='ColorPicker' ref={ref}/>
    )
}
export default ColorPicker
