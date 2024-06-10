import { Request, Response } from 'express';
import NoteService from '../services/noteService';
import dbConfig from '../config/dbconfig';
import { Note } from '../interfaces/noteInterface';
import { ConnectionPool } from 'mssql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a connection to the database
const db = new ConnectionPool(dbConfig);
const noteService = new NoteService(db);

db.connect().then(() => {
    console.log('Database connection established');
}).catch(err => {
    console.error('Database connection failed:', err);
});

// Controller function to create a new note
export const createNote = async (req: Request, res: Response) => {
    const newNote: Note = {
        id: 0,
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date(),
    };

    try {
        await noteService.createNote(newNote);
        res.status(201).send('Note created successfully');
    } catch (err) {
        console.error('Error creating note:', err);
        if (err instanceof Error) {
            res.status(500).send(err.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
};

// Controller function to fetch all notes
export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const notes = await noteService.getAllNotes();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).send('unknown error occurred');
    }
};

// Controller function to fetch a single note by ID
export const getNoteById = async (req: Request, res: Response) => {
    const noteId: number = parseInt(req.params.id);

    try {
        const note = await noteService.getNoteById(noteId);
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).send('Note not found');
        }
    } catch (err) {
        res.status(500).send('unknown error occurred');
    }
};

// Controller function to update a note by ID
export const updateNoteById = async (req: Request, res: Response) => {
    const noteId: number = parseInt(req.params.id);
    const updatedNote: Note = {
        id: noteId,
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date(),
    };

    try {
        await noteService.updateNoteById(noteId, updatedNote);
        res.status(200).send('Note updated successfully');
    } catch (err) {
        res.status(500).send('unknown error occurred');
    }
};

// Controller function to delete a note by ID
export const deleteNoteById = async (req: Request, res: Response) => {
    const noteId: number = parseInt(req.params.id);

    try {
        await noteService.deleteNoteById(noteId);
        res.status(200).send('Note deleted successfully');
    } catch (err) {
        res.status(500).send('unknown error occurred');
    }
};
