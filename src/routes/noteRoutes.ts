import { Router } from 'express';
import { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById } from '../controllers/noteController';

const router: Router = Router();

// Route to create a new note
router.post('/', createNote);

// Route to fetch all notes
router.get('/', getAllNotes);

// Route to fetch a single note by ID
router.get('/:id', getNoteById);

// Route to update a note by ID
router.put('/:id', updateNoteById);

// Route to delete a note by ID
router.delete('/:id', deleteNoteById);

export default router;
