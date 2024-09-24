import { useEffect, useState } from "react";
import {sampleNotes} from '../Sample Data/sample'
import { useNavigate } from "react-router-dom";
import { getAllNotes, getCategoryNotesById } from "../api calls/ApiCalls"; // Ensure correct path

import Note from "./Note";
import "./NotesList.css";

export default function NotesList({ search, catFilter, setNote }) {
  const [notes, setNotes] = useState(sampleNotes);

  const navigate = useNavigate();
  const handleNote = (note) => {
    setNote(note);
    navigate("/note-add");
  };


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes =
          catFilter[0] === null
            ? await getAllNotes()
            : await getCategoryNotesById(catFilter[0], catFilter[1]);
        if (fetchedNotes) 
          setNotes(fetchedNotes);

        
      } catch (err) {
        console.error("Error fetching notes:", err);
        setNotes([]);
      }
    };

    fetchNotes();
  }, [catFilter]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const notesList = filteredNotes.map((note) => {
    const categoryName = note.category?.name || "";
    var accessType = 0;
    if (note.category?.accessType === 1) accessType = 1;
    return (
      <Note
        id={note.id}
        key={note.id}
        content={note.content}
        title={note.title}
        category={categoryName}
        date={note.dateTime}
        Access={accessType}
        onClick={() => handleNote(note)}
      />
    );
  });

  return (
    <div className="ListNotes">
      {notes.length > 0 ? notesList : <p>No notes found</p>}
    </div>
  );
}


