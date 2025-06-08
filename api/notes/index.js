import pkg from '@prisma/client';
import { verifyToken } from '../../lib/verifyToken.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = verifyToken(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    try {
      const notes = await prisma.note.findMany({
        where: { userId },
        select: { id: true, title: true, note: true }
      });
      res.status(200).json(
        notes.map(n => ({
          id:      n.id,
          title:   n.title,
          content: n.note
        }))
      )
    } catch {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    try {
      const newNote = await prisma.note.create({
        data: { title, note: content, userId }
      });
      res.status(201).json({
        id:      newNote.id,
        title:   newNote.title,
        content: newNote.note
      })
    } catch {
      res.status(500).json({ error: "Failed to create note" });
    }
  }
}
