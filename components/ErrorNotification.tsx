import React from 'react'
import { useLocalizationString } from '../app/hooks'
import { DisplayableError } from '../app/slices'
import { formatDisplayableError } from '../utils'
import Notification from './Notification'

export type ErrorNotificationProps = {
    error: DisplayableError,
    onClosed?: () => void
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({error, onClosed}) => {
    const title = useLocalizationString('ErrorNotification.title')
    const formattedError = formatDisplayableError(error)

    return (
        <Notification indicatorColor='#cc0000' title={title} onClosed={onClosed}>
            {formattedError}
        </Notification>
    )
}
export default ErrorNotification
