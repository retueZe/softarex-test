import React, { CSSProperties } from 'react'
import '../styles/MaskedIcon.sass'

export type MaskedIconProps = {
    color?: string | null
    maskUrl?: string | null
    circle?: boolean | null
}

const MaskedIcon: React.FC<MaskedIconProps> = ({color, maskUrl, circle}) => {
    circle ??= false
    const formattedMaskUrl = typeof maskUrl === 'string' ? `url('${maskUrl}')` : undefined
    const style: CSSProperties = {
        background: color ?? undefined,
        maskImage: formattedMaskUrl,
        WebkitMaskImage: formattedMaskUrl,
        borderRadius: circle ? '50%' : undefined
    }

    return (
        <div className='MaskedIcon' style={style}></div>
    )
}
export default MaskedIcon
