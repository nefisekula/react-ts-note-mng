import { RequestHandler, Request, Response, NextFunction } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    }

export const getNote: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // It should be the same as in the routes/note.ts file
    const noteId = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note Id");
        }

        const note = await NoteModel.findById(noteId).exec();
        
        if (!note) {
            throw createHttpError(404, "Note not found.");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

interface UpdateNoteParam {
    noteId: string
}

interface CreateNote {
    title?: string,
    text?: string
}

export const createNote: RequestHandler<unknown, unknown, CreateNote, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title.");
        }

        const newNote = await NoteModel.create({
            title: title,
            text: text
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}

interface UpdateNote {
    title?: string,
    text?: string
}

export const updateNote: RequestHandler<UpdateNoteParam, unknown, UpdateNote, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note Id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a title.");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found.");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
}

export const deleteNote: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note Id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found.");
        }

        note.deleteOne();

        res.sendStatus(204);
        
    } catch (error) {
        next(error);
        
    }
}