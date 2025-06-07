// At the top:
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = req.userId || req.body.userId || req.query.userId;

  if (req.method === "GET") {
    try {
      const notes = await prisma.note.findMany({
        where: { userId: Number(userId) },
        select: { id: true, title: true, note: true }
      });
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    try {
      const newNote = await prisma.note.create({
        data: {
          title,
          note: content,
          user: { connect: { id: Number(userId) } }
        }
      });
      res.status(201).json(newNote);
    } catch (err) {
      res.status(500).json({ error: "Failed to create note" });
    }
  }
}
