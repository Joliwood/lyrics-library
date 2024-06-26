import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    throw new Error('Error hashing password');
  }
}
