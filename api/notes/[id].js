import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const noteId = parseInt(req.query.id);
  const userId = req.userId || req.body.userId || req.query.userId;

  if (req.method === "PUT") {
    const { title, content } = req.body;
    try {
      const updated = await prisma.note.updateMany({
        where: { id: noteId, userId: Number(userId) },
        data: { title, note: content },
      });
      if (updated.count === 0) {
        return res.status(403).json({ error: "Not allowed to update this note" });
      }
      res.status(200).json({ message: "Note updated" });
    } catch (err) {
      res.status(500).json({ error: "Failed to update note" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deleted = await prisma.note.deleteMany({
        where: { id: noteId, userId: Number(userId) }
      });
      if (deleted.count === 0) {
        return res.status(403).json({ error: "Not allowed to delete this note" });
      }
      res.status(200).json({ message: "Note deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete note" });
    }
  }
}
