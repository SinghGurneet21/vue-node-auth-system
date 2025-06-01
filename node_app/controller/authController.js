import authService from '../services/authService.js'

export const register = async (req, res) => {
  try {
    console.log(req.body)
    await authService.register(req.body)
    res.status(200).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body)
    if (!result) return res.status(400).json({ message: 'Invalid credentials' })
    res.status(200).json({ message: 'Login successful', ...result })
  } catch (err) {
    res.status(400).json({ message: 'Login error', error: err.message })
  }
}
