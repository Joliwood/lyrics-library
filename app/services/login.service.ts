import jwt from 'jsonwebtoken';

export default {
  // Check if the user is authenticated through the token, check the expiration time and the IP
  getUser(token: string, ip: string) {
    if (!token) return null;

    // TODO : Define types
    let user: any;

    if (process.env.JWT_SECRET) {
      user = jwt.verify(token, process.env.JWT_SECRET);
    }

    if (!user) return null;

    if (user.ip !== ip) return null;

    return user;
  },
};
