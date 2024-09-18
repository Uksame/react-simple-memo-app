import React from "react";
import "./Note.css";

export default function Note({ title, content, category, date, Access }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
  });

  if (Access === 0) {
    return (
      <div className="note">
        <div className="note-header">
          <h3 className="note-title">{title}</h3>
          <h3 className="note-category">{category}</h3>
        </div>
        <p className="note-content">{content}</p>
        <div className="note-footer">
          <span className="note-date">{formattedDate}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="note">
        <div className="note-header">
          <h3 className="note-title">{title}</h3>
          <span className="note-category private">{category}</span>
        </div>
        <p className="note-content">{/* {content} */}</p>
        <div className="note-footer">
          <span className="note-date">{/* {formattedDate} */}</span>
        </div>
      </div>
    );
  }
}
