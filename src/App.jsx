import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import { useNavigate } from "react-router-dom"; // 👈 ADD THIS

function App() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate(); // 👈 ADD THIS

  // Check for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect to login if not logged in
    } else {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
      if (err.response && err.response.status === 401) {
        navigate("/"); // Unauthorized, go back to login
      }
    }
  };

const addNote = async (newNote) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/notes",
      newNote,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchNotes();
    // Optional: update state with new note
    console.log("Note added:", res.data);
  } catch (err) {
    console.error("Error adding note:", err);
    alert("Failed to add note: " + (err.response?.data?.message || err.response?.data?.error || err.message));
  }
};


const deleteNote = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id)); // update UI
  } catch (err) {
    alert("Delete failed: " + (err.response?.data?.error || err.message));
  }
};

const updateNote = async (id, updatedNote) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`http://localhost:5000/api/notes/${id}`, updatedNote, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotes(prev =>
      prev.map(note => note.id === id ? res.data : note)
    );
    fetchNotes();
  } catch (err) {
    alert("Update failed: " + (err.response?.data?.error || err.message));
  }
};

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
