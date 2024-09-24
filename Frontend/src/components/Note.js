import React from "react";
import "./Note.css";

export default function Note({
  title,
  content,
  category,
  date,
  Access,
  onClick,
}) {
  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  const truncatedTitle = truncateText(title, 15);
  const truncatedCategory = truncateText(category, 15);
  const truncatedContent = truncateText(content, 50);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
  });

  return (
    <div onClick={onClick} className="note">
      <div className="note-header">
        <h3 className="note-title">{truncatedTitle}</h3>
        <h3 className={`note-category ${Access === 0 ? "" : "private"}`}>
          {truncatedCategory}
        </h3>
      </div>
      <p className="note-content">{truncatedContent}</p>
      <div className="note-footer">
        <span className="note-date">{formattedDate}</span>
      </div>
    </div>
  );
}
