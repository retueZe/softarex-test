import React, { useEffect, useState } from 'react'
import '../styles/SuggestionListView.sass'
import { useLocalizationString } from '../app/hooks'
import { generateSuggestionList } from '../utils'

const SuggestionListView: React.FC = () => {
    const prefix = useLocalizationString('SuggestionListView.prefix')
    const [list, setList] = useState<string[]>([])
    useEffect(() => setList(generateSuggestionList()), [])

    return (
        <div className='SuggestionListView'>
            <span>{prefix}&nbsp;</span>
            <ul>
                {Array.from(list, (suggestion, i) => (
                    <li key={i}>
                        <a href={`/search?q=${suggestion}`}>{suggestion}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default SuggestionListView
