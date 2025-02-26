const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('../config/passport')

router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then(user => res.status(201).json({ user }))
    .catch(err => console.log(err))
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req
  res.status(200).json({ user })
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.status(200).json({ msg: 'Logged out' })
})

router.get('/loggedIn', isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(500).json({ err }))
})

router.post('/edit', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { ...req.body })
    .then(user => res.status(200).json({ user }))
    .catch(err => console.log(err))
})

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' })
}

module.exports = router
