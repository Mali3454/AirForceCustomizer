import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import { store } from './store'
import Home from './pages/Home'
import Customizer from './pages/Customizer'

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<div className='app-container'>
				<Provider store={store}>
					<Header />
					<main className="flex justify-center items-center h-[70vh]">
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/register' element={<Register />} />
							<Route path='/login' element={<Login />} />
							<Route path='/customizer' element={<Customizer />} />
						</Routes>
					</main>
				</Provider>
			</div>
		</BrowserRouter>
	)
}

export default App
