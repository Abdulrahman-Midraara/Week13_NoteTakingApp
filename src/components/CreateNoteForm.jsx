// TODO: Import useForm, zodResolver, axios, useNavigate, useState, and noteSchema

// 👇 Import necessary React and utility libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// 👇 Import the Zod schema for note validation
import { noteSchema } from "../schema/notes";

import { Save } from "lucide-react";

const CreateNoteForm = () => {
  // TODO: Setup isSubmitting state with useState
  // TODO: create navigate variable and set to useNavigate()

  // 👇 State to handle loading while form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 👇 State to display success message
  const [successMessage, setSuccessMessage] = useState("");

  // 👇 Hook to navigate after successful note creation
  const navigate = useNavigate();

  // TODO: Set up the form with useForm from react-hook-form and zodResolver from @hookform/resolvers/zod

  // 👇 useForm hook setup with zodResolver for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(noteSchema),
  });

  const sendToTheServer = async (data) => {
    // TODO: Send the data to the server
    // TODO: Use axios to create a new note in the server using the endpoint http://localhost:3001/api/notes

    try {
      setIsSubmitting(true); // Start loading

      // 👇 Post note data to backend API
      await axios.post("http://localhost:3001/api/notes", data);

      // 👇 Show success message
      setSuccessMessage("Note created successfully!");

      // 👇 Clear form after successful submission
      reset();

      // 👇 Optional: Delay and then redirect
      setTimeout(() => {
        navigate("/"); // Adjust this route if your notes list is at a different path
      }, 1500);
    } catch (error) {
      console.error("Failed to create note:", error.message);
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Create Note</h1>

      {/* TODO: Setup the form with TailwindCSS, create a form with the following fields: title, content, and submit button */}

      {/* 👇 Success message display */}
      {successMessage && (
        <p className="text-green-600 text-sm mb-4">{successMessage}</p>
      )}

      {/* 👇 Form starts here */}
      <form
        onSubmit={handleSubmit(sendToTheServer)}
        className="space-y-4 bg-white shadow-md rounded-md p-6 w-full max-w-lg mx-auto"
      >
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Note Title" // 👈 Placeholder added
            {...register("title")}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Content Input */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            id="content"
            rows="5"
            placeholder="Write your note here..." // 👈 Placeholder added
            {...register("content")}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50 w-full"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Saving..." : "Save Note"}
        </button>
      </form>
    </>
  );
};

export default CreateNoteForm;
