import React, { CSSProperties } from 'react'
import '../styles/Icon.sass'

export type IconProps = {
    url?: string | null
    circle?: boolean | null
}

const Icon: React.FC<IconProps> = ({url, circle}) => {
    circle ??= false
    const formattedUrl = `url('${url}')`
    const style: CSSProperties | undefined = typeof url === 'string' ? {
        maskImage: formattedUrl,
        WebkitMaskImage: formattedUrl,
        borderRadius: circle ? '50%' : undefined
    } : undefined

    return (
        <div className='Icon' style={style}></div>
    )
}
export default Icon
