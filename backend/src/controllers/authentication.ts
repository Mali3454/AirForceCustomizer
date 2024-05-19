import express from 'express'
import { createUser, getUsersByEmail } from '../db/users'
import { random, authentication } from '../helpers'

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body
		console.log('Login attempt:', { email })

		if (!email || !password) {
			console.error('Missing email or password')
			return res.status(400).send('Missing email or password')
		}

		const user = await getUsersByEmail(email).select('+authentication.salt +authentication.password')
		console.log('User found:', user)

		if (!user) {
			console.error('User not found')
			return res.status(400).send('User not found')
		}

		const expectedHash = authentication(user.authentication.salt, password)
		console.log('Expected hash:', expectedHash)

		if (user.authentication.password !== expectedHash) {
			console.error('Invalid password')
			return res.status(403).send('Invalid password')
		}

		const salt = random()
		user.authentication.sessionToken = authentication(salt, user._id.toString())
		console.log('Session token:', user.authentication.sessionToken)

		await user.save()
		console.log('User saved with new session token')

		res.cookie('SHOE-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' })
		console.log('Cookie set')

		return res.status(200).json(user).end()
	} catch (error) {
		console.error('Error during login:', error)
		return res.status(500).send('Internal server error')
	}
}

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body
		console.log('Register attempt:', { email, username })

		if (!email || !password || !username) {
			console.error('Missing email, password, or username')
			return res.status(400).send('Missing email, password, or username')
		}

		const existingUsers = await getUsersByEmail(email)
		console.log('Existing users:', existingUsers)

		if (existingUsers) {
			console.error('User already exists')
			return res.status(400).send('User already exists')
		}

		const salt = random()
		const user = await createUser({
			email,
			username,
			authentication: {
				salt,
				password: authentication(salt, password),
			},
		})

		console.log('User created:', user)
		return res.status(200).json(user).end()
	} catch (error) {
		console.error('Error during registration:', error)
		return res.status(500).send('Internal server error')
	}
}
