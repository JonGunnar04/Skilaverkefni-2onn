import db from '../config/db';

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'USER' | 'ADMIN';
  created_at: Date;
  updated_at: Date;
}

// Get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.oneOrNone<User>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    console.log('User fetched from database:', user);
    return user;
  } catch (err) {
    throw new Error('Error loading user by email: ' + err);
  }
};

// Create new user
export const createUser = async (
  name: string,
  email: string,
  passwordHash: string
): Promise<User> => {
  try {
    const user = await db.one<User>(
      `
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, 'USER')
      RETURNING *;
      `,
      [name, email, passwordHash]
    );
    console.log('Created user successfully:', user);
    return user;
  } catch (err) {
    throw new Error('Error creating user: ' + err);
  }
};
