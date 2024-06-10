import { ConnectionPool, Request } from 'mssql';
import { Note } from '../interfaces/noteInterface';

class NoteModel {
    constructor(private db: ConnectionPool) {}

    // Create a new note
    public async createNote(note: Note): Promise<void> {
        const request = new Request(this.db);
        await request.input('title', note.title)
                     .input('content', note.content)
                     .input('createdAt', note.createdAt)
                     .query('INSERT INTO notes (title, content, createdAt) VALUES (@title, @content, @createdAt)');
    }

    // Fetch all notes
    public async getAllNotes(): Promise<Note[]> {
        const request = new Request(this.db);
        const result = await request.query('SELECT * FROM notes');
        return result.recordset;
    }

    // Fetch a single note by ID
    public async getNoteById(id: number): Promise<Note | null> {
        const request = new Request(this.db);
        const result = await request.input('id', id)
                                    .query('SELECT * FROM notes WHERE id = @id');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }

    // Update a note by ID
    public async updateNoteById(id: number, note: Note): Promise<void> {
        const request = new Request(this.db);
        await request.input('id', id)
                     .input('title', note.title)
                     .input('content', note.content)
                     .query('UPDATE notes SET title = @title, content = @content WHERE id = @id');
    }

    // Delete a note by ID
    public async deleteNoteById(id: number): Promise<void> {
        const request = new Request(this.db);
        await request.input('id', id)
                     .query('DELETE FROM notes WHERE id = @id');
    }
}

export default NoteModel;
