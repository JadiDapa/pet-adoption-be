import jwt from 'jsonwebtoken';
import response from './helper.error';

const generateToken = (payload: string | object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRED_TIME });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

const authCheck = (req: any, res: any, next: () => void) => {
  const token = req.headers.authorization;

  if (!token) {
    return response.Unauthorized(res, res, 'Unauthorized');
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return response.Unauthorized(req, res, 'Unauthorized');
  }
};

export default { generateToken, verifyToken, authCheck };
