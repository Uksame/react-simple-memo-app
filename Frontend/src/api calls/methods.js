import { useEffect, useState } from "react";
import { getAllNotes } from "./ApiCalls"; // Ensure correct path

import Note from "../Components/Note";
import "../App.css";

export function ListNotes({ search }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes on component mount
    const fetchNotes = async () => {
      const fetchedNotes = await getAllNotes();
      if (fetchedNotes) {
        setNotes(fetchedNotes); // Set notes if fetched successfully
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const notesList = filteredNotes.map((note) => {
    const categoryName = note.category?.name || "";
    var accessType = 0;
    if (note.category?.accessType === 1) accessType = 1;
    //Replace accessType = 1; with return; on final

    return (
      <Note
        key={note.id}
        content={note.content}
        title={note.title}
        category={categoryName}
        date={note.dateTime}
        Access={accessType}
      />
    );
  });

  return <div className="ListNotes">{notes.length > 0 ? notesList : <p></p>}</div>;
}
