import React from 'react'
import '../styles/LanguagePicker.sass'
import { LocalizationLanguage } from '../app/slices'
import { useUser } from '../app/hooks'
import LOCALIZATION from '../assets/localization.json'

export type LanguagePickerProps = {
    options: LocalizationLanguage[]
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({options}) => {
    const [user, userSlice] = useUser()
    const languageNames = options.map(option => LOCALIZATION[option]['LanguagePicker.language-name'])
    const createButtonClickHandler = (newLanguage: LocalizationLanguage) => (): void => {
        if (newLanguage === user.language) return

        userSlice.dispatch('languageChanged', newLanguage)
    }

    return (
        <div className='LanguagePicker'>
            {Array.from(options, (option, i) => (
                <button key={i} onClick={createButtonClickHandler(option)}
                    className={option === user.language ? 'LanguagePicker-selected' : undefined}>
                    {languageNames[i]}
                </button>
            ))}
        </div>
    )
}
export default LanguagePicker
