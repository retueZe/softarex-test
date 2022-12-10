import React from 'react'
import '../styles/App.sass'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { ConnectedRouter } from 'react-router-redux'
import { IndexPage, SearchPage } from '../components/pages'
import store from '../app/store'
// import { createBrowserHistory } from 'history'

// const history = createBrowserHistory()

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<IndexPage/>}/>
                    <Route path='/search' element={<SearchPage/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}
export default App
