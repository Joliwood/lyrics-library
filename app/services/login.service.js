import jwt from 'jsonwebtoken';

export default {
  // Check if the user is authenticated through the token, check the expiration time and the IP
  getUser(token, ip) {
    if (!token) return null;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user.ip !== ip) return null;

    return user;
  },
};
