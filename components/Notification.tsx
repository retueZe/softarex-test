import React, { CSSProperties, ReactNode } from 'react'
import '../styles/Notification.sass'

export type NotificationProps = {
    indicatorColor?: string
    title?: string
    onClosed?: () => void
    children?: ReactNode
}

const Notification: React.FC<NotificationProps> = ({indicatorColor, title, onClosed, children}) => {
    const indicatorStyle: CSSProperties = {
        background: indicatorColor ?? 'var(--primary-color)'
    }

    return (
        <div className='Notification'>
            <div className='Notification-header'>
                <div>
                    <div style={indicatorStyle}></div>
                    <div>{title}</div>
                </div>
                <button onClick={onClosed}>
                    <div>{/* icon */}</div>
                </button>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
export default Notification
