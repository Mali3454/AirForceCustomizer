import React from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
	username: string
	password: string
	email: string
}

const Register: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()

	const onSubmit = (data: FormData) => {
		fetch('http://localhost:8080/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: data.username,
				password: data.password,
				email: data.email,
			}),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
			})
			.catch(error => {
				console.error(error)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='container mx-auto mt-4'>
			<div className='flex flex-col'>
				<label htmlFor='username' className='mb-2 font-semibold'>
					Login:
				</label>
				<input
					id='username'
					type='text'
					{...register('username', {
						required: 'Login jest wymagany i musi zawierać co najmniej 3 znaki.',
						minLength: 3,
					})}
					className='border border-gray-300 p-2 rounded-md'
				/>
				{errors.username && <span className='text-red-500 text-xs mt-1'>{errors.username.message}</span>}
			</div>

			<div className='flex flex-col'>
				<label htmlFor='haslo' className='mb-2 font-semibold'>
					Hasło:
				</label>
				<input
					id='password'
					type='password'
					{...register('password', {
						required: 'Hasło jest wymagane i musi zawierać co najmniej 6 znaków.',
						minLength: 6,
					})}
					className='border border-gray-300 p-2 rounded-md'
				/>
				{errors.password && <span className='text-red-500 text-xs mt-1'>{errors.password.message}</span>}
			</div>

			<div className='flex flex-col'>
				<label htmlFor='email' className='mb-2 font-semibold'>
					Email:
				</label>
				<input
					id='email'
					type='email'
					{...register('email', { required: 'Podaj poprawny adres email.', pattern: /^\S+@\S+$/i })}
					className='border border-gray-300 p-2 rounded-md'
				/>
				{errors.email && <span className='text-red-500 text-xs mt-1'>{errors.email.message}</span>}
			</div>

			<button type='submit' className='bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4'>
				Zarejestruj się
			</button>
		</form>
	)
}

export default Register
