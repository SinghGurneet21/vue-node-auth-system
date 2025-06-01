const captchaValidator = (req, res, next) => {
  const { captcha } = req.body
  console.log('session in memory', req.session)

  if (!req.session || !req.session.captcha) {
    return res.status(400).json({ message: 'CAPTCHA expired or session not found' })
  }

  // Case-sensitive comparison
  if (captcha !== req.session.captcha) {
    return res.status(400).json({ message: 'CAPTCHA does not match' })
  }

  // Invalidate CAPTCHA after use
  req.session.captcha = null

  next()
}

export default captchaValidator
