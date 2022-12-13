import useUser from './useUser'
import localizationAsset from '../../assets/localization.json'
import { LocalizationString } from '../slices'

export default function useLocalizationString<S extends LocalizationString>(string: S) {
    const [user] = useUser()

    return localizationAsset[user.language][string]
}
