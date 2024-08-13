const { createNote, getNoteById, getNotesByTitleSubstring, updateNote } = require('../services/noteService');
const { sequelize } = require('../config/db');
const { Notes } = require('../models/noteModel');

jest.mock('../models/noteModel', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
}));

jest.mock('../config/db', () => ({
  sequelize: {
    transaction: jest.fn(),
  },
}));

describe('noteService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('createNote', () => {
    it('should create a new note', async () => {
      const title = 'Test Note';
      const description = 'This is a test note';
      const noteData = { title, description };

       Notes.create.mockResolvedValue({ id: 1, ...noteData });

      const result = await createNote(title, description);

      expect(result).toEqual({ status: 201, data: { id: 1, title, description } });
      expect(Notes.create).toHaveBeenCalledTimes(1);
      expect(Notes.create).toHaveBeenCalledWith(noteData);
    });

    it('should return an error if creation fails', async () => {
      const title = 'Test Note';
      const description = 'This is a test note';
      const error = new Error('Creation failed');

      Notes.create.mockRejectedValue(error);

      const result = await createNote(title, description);

      expect(result).toEqual({ status: 500, error: 'Internal Server Error' });
      expect(Notes.create).toHaveBeenCalledTimes(1);
      expect(Notes.create).toHaveBeenCalledWith({ title, description });
    });
  });

  describe('getNoteById', () => {
    it('should retrieve a note by ID', async () => {
      const id = 1;
      const noteData = { id, title: 'Test Note', description: 'This is a test note' };

      Notes.findByPk.mockResolvedValue(noteData);

      const result = await getNoteById(id);

      expect(result).toEqual({ status: 200, data: noteData });
      expect(Notes.findByPk).toHaveBeenCalledTimes(1);
      expect(Notes.findByPk).toHaveBeenCalledWith(id);
    });

    it('should return a 404 error if note is not found', async () => {
      const id = 1;

      Notes.findByPk.mockResolvedValue(null);

      const result = await getNoteById(id);

      expect(result).toEqual({ status: 404, error: 'Note not found' });
      expect(Notes.findByPk).toHaveBeenCalledTimes(1);
      expect(Notes.findByPk).toHaveBeenCalledWith(id);
    });
  });

  describe('getNotesByTitleSubstring', () => {
    it('should retrieve notes by title substring', async () => {
      const titleSubstring = 'test';
      const notesData = [
        { id: 1, title: 'Test Note 1', description: 'This is a test note 1' },
        { id: 2, title: 'Test Note 2', description: 'This is a test note 2' },
      ];

      Notes.findAll.mockResolvedValue(notesData);

      const result = await getNotesByTitleSubstring(titleSubstring);

      expect(result).toEqual({ status: 200, data: notesData });
      expect(Notes.findAll).toHaveBeenCalledTimes(1);
      expect(Notes.findAll).toHaveBeenCalledWith({
        where: {
          title: {
            [Op.like]: `%${titleSubstring}%`,
          },
        },
      });
    });
  });

  describe('updateNote', () => {
    it('should update a note', async () => {
      const id = 1;
      const title = 'Updated Test Note';
      const description = 'This is an updated test note';
      const noteData = { id, title, description, updated_at: new Date() };

      Notes.findByPk.mockResolvedValue({ id, title: 'Original Test Note', description: 'This is an original test note' });
      Notes.update.mockResolvedValue([1]);

      const result = await updateNote(id, title, description);

      expect(result).toEqual({ status: 200, message: 'Note updated successfully' });
      expect(Notes.findByPk).toHaveBeenCalledTimes(1);
      expect(Notes.findByPk).toHaveBeenCalledWith(id);
      expect(Notes.update).toHaveBeenCalledTimes(1);
      expect(Notes.update).toHaveBeenCalledWith(noteData, { where: { id } });
    });

    it('should return a 404 error if note is not found', async () => {
      const id = 1;
      const title = 'Updated Test Note';
      const description = 'This is an updated test note';
  
      Notes.findByPk.mockResolvedValue(null);
  
      await expect(updateNote(id, title, description)).rejects.toEqual(
        expect.objectContaining({
          status: 404,
          message: 'Note not found',
        }),
      );
    });

  });

});