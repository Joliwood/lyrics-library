import jwt from 'jsonwebtoken';

export default {
  getUser(token) {
    if (!token) return null;

    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  },
};
