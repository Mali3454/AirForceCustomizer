import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch} from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';

interface IFormInput {
	email: string
	password: string
}

const Login: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>()

	const onSubmit: SubmitHandler<IFormInput> = data => {
		console.log(data)
		fetch('http://localhost:8080/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				dispatch(login())
				navigate('/')
			})
			.catch(error => {
				console.error(error)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='container mx-auto mt-4'>
			<div className='flex flex-col'>
				<label htmlFor='email' className='mb-2 font-semibold'>
					Email
				</label>
				<input
					id='email'
					type='email'
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: /^\S+@\S+$/i,
							message: 'Podaj poprawny adres email.',
						},
					})}
					className='border border-gray-300 p-2 rounded-md'
				/>
				{errors.email && <span className='text-red-500 text-xs mt-1'>{errors.email.message}</span>}
			</div>

			<div className='flex flex-col'>
				<label htmlFor='password' className='mb-2 font-semibold'>
					Hasło
				</label>
				<input
					id='password'
					type='password'
					{...register('password', { required: 'Podaj poprawne hasło' })}
					className='border border-gray-300 p-2 rounded-md'
				/>
				{errors.password && <span className='text-red-500 text-xs mt-1'>{errors.password.message}</span>}
			</div>

			<button type='submit' className='bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4'>
				Zaloguj się
			</button>
		</form>
	)
}

export default Login
