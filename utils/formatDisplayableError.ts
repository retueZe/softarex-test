import { useUser } from '../app/hooks'
import { DisplayableError, DisplayableErrorCode } from '../app/slices'
import LOCALIZATION from '../assets/localization.json'
import { formatDisplayableErrorCode } from './DisplayableErrorCode'

export function formatDisplayableError(error: DisplayableError): string {
    const messageFormatKey = `displayable-error.${formatDisplayableErrorCode(error.code)}`
    const [user] = useUser()
    const localizationStrings = LOCALIZATION[user.language]
    let message: string = localizationStrings[messageFormatKey] ?? localizationStrings['displayable-error.unknown']

    for (let i = 0; i < error.messageInsertions.length - 0.5; i++)
        message = message.replace(`%${i + 1}`, error.messageInsertions[i])

    message = message.replace('%0', (error.code & ~DisplayableErrorCode.HTTP_ERROR).toString())

    return message
}
