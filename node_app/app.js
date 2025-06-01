import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import session from 'express-session'
import svgCaptcha from 'svg-captcha'
import connectDB from './config/db.js'
import creds from './credentials.json' with { type: 'json' }
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.use(session({
  secret: creds.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // true only with HTTPS
    httpOnly: true
  }
}))

connectDB()

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  console.log('Body:', req.body)
  console.log('Session:', req.session)
  next()
})

// ✅ CAPTCHA
app.get('/api/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 2,
    ignoreChars: '0o1il',
    color: true,
    background: '#ccf'
  })

  req.session.captcha = captcha.text
  console.log('Captcha created:', captcha.text)
  console.log('Session ID:', req.sessionID)
  console.log('Session object now:', req.session)

  res.type('svg')
  res.send(captcha.data)
})

app.get('/api/test', (req, res) => {
  res.status(200).send('success')
})

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
