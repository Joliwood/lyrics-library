import jwt from 'jsonwebtoken';

export default {
  getUser(token, ip) {
    if (!token) return null;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user.ip !== ip) return null;

    return user;
  },
};
