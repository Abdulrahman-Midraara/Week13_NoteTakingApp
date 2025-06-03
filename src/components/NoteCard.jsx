// TODO: Import motion from framer-motion
import { motion } from "framer-motion";
import { Edit, Trash2, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

// Props: note (object), onDelete (function)
const NoteCard = ({ note, onDelete }) => {
  const handleShare = () => {
    const noteUrl = `${window.location.origin}/edit/${note.id}`;
    navigator.clipboard.writeText(noteUrl);
    alert("Link copied to clipboard!");
  };

  return (
    // 👇 Animated wrapper using Framer Motion
    <motion.div
      initial={{ opacity: 0, y: 20 }}       // Start slightly below and transparent
      animate={{ opacity: 1, y: 0 }}        // Animate to visible and lifted up
      transition={{ duration: 0.3 }}        // Smooth transition
      className="bg-yellow-200 p-4 rounded-lg shadow-note relative transition transform hover:scale-[1.02]"
    >
      {/* Note Title */}
      <h3 className="text-lg font-semibold">{note.title}</h3>

      {/* Note Content — rendered as HTML if using rich text */}
      <div
        className="mt-2 text-sm"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      {/* Tag Display */}
      {note.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-yellow-300 text-yellow-800 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions: Edit, Delete, Share */}
      <div className="flex gap-4 mt-4 text-gray-700">
        {/* Edit */}
        <Link to={`/edit/${note.id}`} className="hover:text-blue-600">
          <Edit size={16} />
        </Link>

        {/* Delete */}
        <button onClick={() => onDelete(note.id)} className="hover:text-red-600">
          <Trash2 size={16} />
        </button>

        {/* Share */}
        <button onClick={handleShare} className="hover:text-green-600">
          <Share2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default NoteCard;
