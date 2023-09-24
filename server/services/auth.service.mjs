import jwt from 'jsonwebtoken';

const jwtSecret = 'wiryweryv2835b76t23c4578tyc3485gf34875cbf2485nyfgc24785fgv278345ybntc237845yvt278354ybt89374brtyv23478trv23478rv23874bd784634';

const AuthService = {
  verifyToken: (token) => jwt.verify(token, jwtSecret),
  generateToken: (username) => jwt.sign({ username }, jwtSecret, { expiresIn: '10s' }),
  generateRefreshToken: (username) => jwt.sign({ username }, jwtSecret, { expiresIn: '60s' }),
  refreshToken: (refreshToken) => {
    const { username } = jwt.decode(refreshToken);
    return AuthService.generateToken(username);
  }
}

export default AuthService;
