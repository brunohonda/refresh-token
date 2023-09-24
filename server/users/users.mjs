import { Router } from 'express';
import jwt from 'jsonwebtoken';

const users = [];

const jwtSecret = 'banana';

const routes = Router();

routes.route('/users')
  .post((req, res) => {
    const { username, password } = req.body;

    if (users.findIndex(user => user.username === username) >= 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    users.push({ username, password });

    res.status(201).send();
  })
  .get(
    (req, res, next) => {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).json({ success: false, message: 'No token provided' });
      }

      const [_, token] = authorization.split(' ');

      try {
        jwt.verify(token, jwtSecret);
        next();
      } catch (err) {
        return res.status(401).send();
      }
    },
    (req, res) => {
      return res.json(users.map(user => ({ username: user.username })));
    }
  );

routes.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users.findIndex(user => user.username === username && user.password === password) < 0) {
    return res.status(401).json({ success: false, message: 'Username or password incorrect!' });
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: '10s' });
  const refreshToken = jwt.sign({ username, token }, jwtSecret, { expiresIn: '60s' });

  return res.status(200).json({ token, refreshToken });
});

routes.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  try {
    jwt.verify(refreshToken ?? '', jwtSecret);
    console.log('BANANA', jwt.decode(refreshToken));
    const { username } = jwt.decode(refreshToken);
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '10s' });
    return res.status(200).json({ token, refreshToken });
  } catch (err) {
    console.log(err);
    return res.status(403).send();
  }
});

export default routes;
