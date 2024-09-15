import AuthService from '../../services/auth.service.mjs';
import UsersService from '../../services/users.service.mjs';

const AuthController = {
  async login(req, res) {
    const { username, password } = req.body;
    const user = UsersService.getByUsername(username);

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Username or password incorrect!' });
    }

    const token = AuthService.generateToken(user);
    const refreshToken = AuthService.generateRefreshToken(user);

    return res.status(200)
      .cookie(
        'refreshToken',
        refreshToken,
        {
          secure: false,
          httpOnly: true,
          maxAge: 60000,
        }
      )
      .json({ token });
  },
  async refreshToken(req, res) {
    const { refreshToken } = req.cookies;

    try {
      AuthService.verifyToken(refreshToken ?? '');
      const token = AuthService.refreshToken(refreshToken);
      return res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      return res.status(403).send();
    }
  },
};

export default AuthController;
