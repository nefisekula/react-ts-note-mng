import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel,
  onNoteClicked: (note: NoteModel) => void,
  onDeleteNoteClicked: (note: NoteModel) => void,
  className?: string,
}

const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: NoteProps) => {
  // TODO: Take a look how to use React.Memo for the createdAt/UpdatedAt
  let createdUpdatedText: string;

  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = `Updated: ${formatDate(note.updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(note.createdAt)}`;
  }

  return (
    <Card className={`${styles.noteCard} ${className}`} onClick={() => onNoteClicked(note)}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {note.title} <MdDelete className="text-muted ms-auto" onClick={(e) => {
            onDeleteNoteClicked(note);
            e.stopPropagation();
          }}/>
        </Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer>{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
