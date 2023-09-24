const routes = require('express').Router();

const users = [];

routes.route('/users')
  .post((req, res) => {
    const { username, password } = req.body;

    if (users.findIndex(user => user.username === username) >= 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    users.push({ username, password });

    res.status(201).send();
  })
  .get(async (req, res) => {
    res.json(users.map(user => ({ username: user.username })));
  });

module.exports = routes;
