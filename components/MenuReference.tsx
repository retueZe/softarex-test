import React from 'react'
import { useLocalizationString } from '../app/hooks'
import '../styles/MenuReference.sass'

export type MenuReferenceProps = {
    url: string
    name: MenuReferenceName
}
export type MenuReferenceName = 'discover' | 'license' | 'upload'

const MenuReference: React.FC<MenuReferenceProps> = ({url, name}) => {
    const content = useLocalizationString(`MenuReference.${name}`)

    return (
        <a className='MenuReference' href={url}>
            {content}
        </a>
    )
}
export default MenuReference
