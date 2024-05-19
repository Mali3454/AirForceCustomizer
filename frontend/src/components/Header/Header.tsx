import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { logout } from '../../features/auth/authSlice'

import logo from '../../assets/logo.webp'

const Header: React.FC = () => {
	const navigate = useNavigate()
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
	const dispatch = useDispatch()

	const handleLogin = (): void => {
		navigate('/login')
	}

	const handleRegister = (): void => {
		navigate('/register')
	}

	const navigateHome = (): void => {
		navigate('/')
	}

	const handleLogout = (): void => {
		dispatch(logout())
		navigate('/')
	}

	return (
		<header className='bg-gradient-to-r from-gray-800 to-gray-500 text-white p-4 mb-6'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='logo-container cursor-pointer' onClick={navigateHome}>
					<img src={logo} alt='Logo' className='h-16 mix-blend-lighten' />
				</div>
				<nav className='nav-bar'>
					<>
						{isLoggedIn ? (
							<button
								onClick={handleLogout}
								className='nav-link btn-logout px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 mr-2'>
								Wyloguj
							</button>
						) : (
							<button
								onClick={handleLogin}
								className='nav-link btn-login px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 mr-2'>
								Zaloguj się
							</button>
						)}
						<button
							onClick={handleRegister}
							className='nav-link btn-register px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'>
							Zarejestruj się
						</button>
					</>
				</nav>
			</div>
		</header>
	)
}

export default Header
