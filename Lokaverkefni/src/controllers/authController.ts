import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../models/userModel';

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({
        error: 'Email already in use',
        message: `User with email '${email}' already exists`,
      });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, passwordHash);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'Failed to register user', details: String(err) });
  }
};
