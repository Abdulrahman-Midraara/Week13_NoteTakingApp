// 👇 Import necessary libraries and components
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import NoteCard from "../components/NoteCard";
import { StickyNote } from "lucide-react";

const ViewNotes = () => {
  // 👇 State for storing all notes
  const [notes, setNotes] = useState([]);

  // 👇 State for handling filtered display
  const [filteredNotes, setFilteredNotes] = useState([]);

  // 👇 State for search input
  const [searchQuery, setSearchQuery] = useState("");

  // 👇 State for loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 Function to fetch notes from backend API
  const loadNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/notes");
      setNotes(response.data);
      setFilteredNotes(response.data); // Initialize filtered with full list
      setError(null);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 👇 Load notes when component mounts
  useEffect(() => {
    loadNotes();
  }, []);

  // 👇 Function to handle note deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/notes/${id}`);
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes); // Update filtered notes after deletion
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note. Please try again.");
    }
  };

  // 👇 Function to filter notes based on search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );

    setFilteredNotes(filtered);
  };

  // 👇 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-yellow-500">
          <StickyNote size={48} />
        </div>
      </div>
    );
  }

  // 👇 Error state
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={loadNotes}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // 👇 Empty notes state
  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4 text-yellow-400">
          <StickyNote size={64} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Notes Yet
        </h2>
        <p className="text-gray-500 mb-6">
          Create your first note to get started
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Create a Note
        </Link>
      </div>
    );
  }

  // 👇 Final rendered UI
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Notes</h1>
        <p className="text-gray-600 mb-4">
          {filteredNotes.length}{" "}
          {filteredNotes.length === 1 ? "note" : "notes"} found
        </p>

        {/* 👇 Search input field */}
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* 👇 Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ViewNotes;
