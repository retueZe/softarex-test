import React from 'react'
import '../styles/MenuReferences.sass'
import { provideMenuReferenceUrl } from '../utils'
import MenuReference, { MenuReferenceName } from './MenuReference'

const REFERENCE_NAMES: MenuReferenceName[] = ['discover', 'upload', 'license']

const MenuReferences: React.FC = () => {
    return (
        <div className='MenuReferences'>
            {Array.from(REFERENCE_NAMES, (name, i) => (
                <div>
                    <MenuReference key={i} name={name} url={provideMenuReferenceUrl(name)}/>
                </div>
            ))}
        </div>
    )
}
export default MenuReferences
