// Import necessary libraries and components
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { noteSchema } from "../schema/notes";
import { Save } from "lucide-react";

const EditNote = () => {
  // State for handling loading and form feedback
  const [loading, setLoading] = useState(true);
  const [initialNote, setInitialNote] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Hooks for navigation and route parameters
  const navigate = useNavigate();
  const { id } = useParams();

  // Set up form using react-hook-form and zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(noteSchema),
  });

  // Fetch note by ID when component mounts
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/notes/${id}`);
        const note = response.data;
        setInitialNote(note);
        setValue("title", note.title);
        setValue("content", note.content);
        setTags(note.tags || []);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, setValue]);

  // Handle tag addition
  const addTag = () => {
    const trimmed = tagInput.trim();
    if (
      trimmed &&
      !tags.includes(trimmed) &&
      tags.length < 5 &&
      trimmed.length <= 15
    ) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle note update
  const onSubmit = async (data) => {
    try {
      data.tags = tags;
      await axios.put(`http://localhost:3001/api/notes/${id}`, data);
      setSuccessMessage("Note updated successfully!");
      setTimeout(() => navigate("/notes"), 1500);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading note...</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>

      {successMessage && (
        <p className="text-green-600 text-sm mb-4">{successMessage}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white shadow-md rounded-md p-6 w-full max-w-lg mx-auto"
      >
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Note Title"
            {...register("title")}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-xs text-gray-500 mt-1">
            {watch("title")?.length || 0}/50
          </div>
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Content Input */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
          <textarea
            id="content"
            rows="5"
            placeholder="Write your note here..."
            {...register("content")}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-xs text-gray-500 mt-1">
            {watch("content")?.length || 0}/500
          </div>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        {/* Tag Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Press Enter to add"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-yellow-100 text-yellow-800 px-2 py-1 text-sm rounded-md flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-xs text-red-600 hover:text-red-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {tags.length}/5 tags — max 15 chars each
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
        >
          <Save className="w-4 h-4" />
          Update Note
        </button>
      </form>
    </>
  );
};

export default EditNote;
