import React, { CSSProperties } from 'react'
import '../styles/UserAvatarView.sass'

export type UserAvatarViewProps = {
    name: string
}

const UserAvatarView: React.FC<UserAvatarViewProps> = ({name}) => {
    const userNameHash = [...name]
        .map(char => char.charCodeAt(0))
        .reduce((accumulator, code) => accumulator + code)
    const hue = userNameHash % 360
    const style: CSSProperties = {
        background: `hsl(${hue}deg, 80%, 40%)`
    }

    return (
        <div className='UserAvatarView' style={style}>
            {name[0]}
        </div>
    )
}
export default UserAvatarView
