import { ConnectionPool } from 'mssql';
import { Note } from '../interfaces/noteInterface';
import NoteModel from '../models/noteModel';

class NoteService {
    private noteModel: NoteModel;

    constructor(db: ConnectionPool) {
        this.noteModel = new NoteModel(db);
    }

    public createNote = async (note: Note): Promise<void> => {
        await this.noteModel.createNote(note);
    }

    public getAllNotes = async (): Promise<Note[]> => {
        return await this.noteModel.getAllNotes();
    }

    public getNoteById = async (id: number): Promise<Note | null> => {
        return await this.noteModel.getNoteById(id);
    }

    public updateNoteById = async (id: number, note: Note): Promise<void> => {
        await this.noteModel.updateNoteById(id, note);
    }

    public deleteNoteById = async (id: number): Promise<void> => {
        await this.noteModel.deleteNoteById(id);
    }
}

export default NoteService;
