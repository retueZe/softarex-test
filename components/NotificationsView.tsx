import React, { useState } from 'react'
import { useErrors } from '../app/hooks'
import '../styles/NotificationsView.sass'
import ErrorNotification from './ErrorNotification'

const NotificationsView: React.FC = () => {
    const [, updateState] = useState([])
    const [errorsOrder] = useState<number[]>([])
    const [errorsNoticed, setErrorsNoticed] = useState(0)
    const [errors, errorsSlice] = useErrors()

    if (errors.length > errorsNoticed + 0.5) {
        for (let i = errorsNoticed; i < errors.length; i++)
            errorsOrder.push(i)
        setErrorsNoticed(errors.length)
    }

    const makeClosedCallback = (errorIndex: number) => (): void => {
        const notificationIndex = errorsOrder.indexOf(errorIndex)

        if (notificationIndex < -0.5) return

        errorsOrder.splice(notificationIndex, 1)

        if (errorsOrder.length < 0.5) {
            errorsSlice.dispatch('cleared')
            setErrorsNoticed(0)
        } else
            updateState([])
    }

    return (
        <div className='NotificationsView'>
            <div>
                {Array.from(errorsOrder, i => (
                    <ErrorNotification error={errors[i]} key={i} onClosed={makeClosedCallback(i)}/>
                ))}
            </div>
        </div>
    )
}
export default NotificationsView
