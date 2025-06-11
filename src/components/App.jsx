import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import { useNavigate } from "react-router-dom"; 

function App() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect to login if not logged in
    } else {
      fetchNotes();
    }
  }, []);

const baseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

const fetchNotes = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get("/api/notes/index", { headers: { Authorization: `Bearer ${token}` } });
    setNotes(res.data);
  } catch (err) {
    console.error("Error fetching notes", err);
    if (err.response && err.response.status === 401) {
      navigate("/");
    }
  }
};

const addNote = async (newNote) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post("/api/notes/index", newNote, { headers: { Authorization: `Bearer ${token}` } });
    fetchNotes();
  } catch (err) {
    console.error("Error adding note:", err);
    alert("Failed to add note: " + (err.response?.data?.message || err.message));
  }
};

const deleteNote = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`/api/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  } catch (err) {
    alert("Delete failed: " + (err.response?.data?.error || err.message));
  }
};

const updateNote = async (id, updatedNote) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`/api/notes/${id}`, updatedNote, { headers: { Authorization: `Bearer ${token}` } });
    setNotes(prev => prev.map(note => note.id === id ? res.data : note));
    fetchNotes();
  } catch (err) {
    alert("Update failed: " + (err.response?.data?.error || err.message));
  }
};
const Firstpeority=async(id)=>{
  try{
    const token=localStorage.getItem("token");
    await axios.post(`/api/notes/peority/${id}`,{headers:{
      Authorization:`Bearer ${token}`
    }});
    setNotes(prev=>prev.map(note=>note.id=== id?res.data:note));
    fetchNotes();
  } catch (err) {
    alert("priority failed: " + (err.response?.data?.error || err.message));
}

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
          onpriority={Firstpeority}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
