import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Note as NoteModel } from '../models/note';
import { NoteInput } from '../network/notes_api';
import { useForm } from 'react-hook-form';
import * as NoteApi from '../network/notes_api';

interface AddEditNoteDialogProps {
  noteToEdit?: NoteModel,
  onDismiss: () => void,
  onNoteSaved: (note: NoteModel) => void
}

const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {    

  const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || ""
    }
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: NoteModel;

      if (noteToEdit) {
        noteResponse = await NoteApi.updateNote(noteToEdit?._id, input);
      } else {
        noteResponse = await NoteApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
          <Modal.Title>
            {noteToEdit ? "Edit Note" : "Add Note"}
          </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Title'
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}/>
              <Form.Control.Feedback type='invalid'>
                {errors.title?.message}
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Text</Form.Label>
            <Form.Control 
            as='textarea'
            rows={5}
            placeholder='Text'
            {...register("text")}/>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' form='addEditNoteForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteDialog;