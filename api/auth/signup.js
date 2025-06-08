import pkg from '@prisma/client';
import bcrypt from 'bcrypt';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // ✅ Manually parse body (for edge/Vercel functions)
  let body = "";
  try {
    const chunks = [];
    for await (const chunk of req.body) chunks.push(chunk);
    body = JSON.parse(Buffer.concat(chunks).toString());
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const { username, password } = body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashed }
    });
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(400).json({ error: "User already exists or error occurred" });
  }
}