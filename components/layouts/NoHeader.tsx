import React, { ReactNode, useLayoutEffect, useRef } from 'react'
import '../../styles/layouts/NoHeader.sass'
import Menu from '../Menu'
import NotificationsView from '../NotificationsView'

const NoHeaderLayout: React.FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className='NoHeaderLayout'>
            <div className='NoHeaderLayout-menu-placeholder'></div>
            {children}
            <Menu fixed/>
            <NotificationsView/>
        </div>
    )
}
export default NoHeaderLayout
