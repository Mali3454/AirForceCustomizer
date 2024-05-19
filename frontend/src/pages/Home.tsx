import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'

const Home: React.FC = () => {
	const navigate = useNavigate()
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

	const navigateCustomizer = (): void => {
		isLoggedIn ? navigate('/customizer') : navigate('/login')
	}

	return (
		<div className='container mx-auto px-6 lg:px-8 py-12 bg-gradient-to-r from-gray-800 to-gray-500 text-white flex flex-col justify-between items-center rounded-lg shadow-xl'>
			<p className='text-lg md:text-xl lg:text-2xl font-semibold mb-6'>
				<span className='block text-2xl md:text-3xl lg:text-4xl font-bold mb-4'>
					Odkryj nowy wymiar personalizacji z Nike Air Force By You.
				</span>
				Nasza innowacyjna aplikacja zapewnia Ci nieograniczone możliwości, aby wyrazić swoją indywidualność poprzez
				kultowy design. Z Nike By You, każdy detal ma znaczenie — od wyboru kolorów po ekskluzywne materiały i
				wykończenia. Niezależnie od tego, czy szukasz ulicznego sznytu, czy eleganckiej subtelności, nasze narzędzie do
				personalizacji oferuje wszystko, czego potrzebujesz, aby Twoje Air Force 1 mówiły więcej niż tysiąc słów.
			</p>

			<button
				className='nav-link btn-register px-3 py-2 rounded-md text-sm font-medium bg-gray-400 hover:bg-gray-700'
				onClick={navigateCustomizer}>
				Zacznij teraz
			</button>
		</div>
	)
}

export default Home
