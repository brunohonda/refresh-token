import authService from './../services/auth.service.mjs';

const AuthMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const [_, token] = authorization.split(' ');

  try {
    authService.verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).send();
  }
};

export default AuthMiddleware;
