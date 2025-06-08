import pkg from '@prisma/client';
import bcrypt from 'bcrypt';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // 🟢 Parse the body explicitly for Vercel (if not already parsed)
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const { username, password } = body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashed }
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: "User already exists or invalid data" });
  }
}
