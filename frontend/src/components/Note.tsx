import React from "react";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {

  // TODO: Take a look how to use React.Memo for the createdAt/UpdatedAt
  let createdUpdatedText: string;

  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = `Updated: ${formatDate(note.updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(note.createdAt)}`
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer>{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
