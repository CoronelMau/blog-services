import { jwtVerify } from 'jose';

export default async function userJWTDTO(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({
      msg: 'User not authorized',
    });

  const jwt = authorization.split(' ')[1];

  if (!jwt)
    return res.status(401).json({
      msg: 'User not authorized',
    });

  const encoder = new TextEncoder();
  const { payload } = await jwtVerify(
    jwt,
    encoder.encode(process.env.JWT_PRIVATE_KEY)
  );

  req.id = payload.id;
  next();
}
