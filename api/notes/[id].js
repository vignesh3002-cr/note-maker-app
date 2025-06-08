import pkg from '@prisma/client';
import { verifyToken } from '../../lib/verifyToken.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const noteId = parseInt(req.query.id);
  const userId = verifyToken(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "PUT") {
    const { title, content } = req.body;
    try {
      const updated = await prisma.note.updateMany({
        where: { id: noteId, userId },
        data: { title, note: content },
      });
      if (updated.count === 0) {
        return res.status(403).json({ error: "Not allowed to update this note" });
      }
      res.status(200).json({ message: "Note updated" });
    } catch {
      res.status(500).json({ error: "Failed to update note" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deleted = await prisma.note.deleteMany({
        where: { id: noteId, userId }
      });
      if (deleted.count === 0) {
        return res.status(403).json({ error: "Not allowed to delete this note" });
      }
      res.status(200).json({ message: "Note deleted" });
    } catch {
      res.status(500).json({ error: "Failed to delete note" });
    }
  }
}
