const { createNote, getNoteById, getNotesByTitleSubstring, updateNote } = require('../services/noteService');
const responseHandler = require('../config/responseHandler');

const createNoteController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await createNote(title, description);
    res.status(201).json(responseHandler.successResponse(data));
  } catch (err) {
    res.status(400).json(responseHandler.validationResponse(err));
  }
};

const getNoteByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getNoteById(id);
    res.status(200).json(responseHandler.successResponse(data));
  } catch (err) {
    res.status(404).json(responseHandler.notFoundResponse(err));
  }
};

const getNotesByTitleSubstringController = async (req, res) => {
  try {
    const substring = req.query.title;
    const data = await getNotesByTitleSubstring(substring);
    res.status(200).json(responseHandler.successResponse(data));
  } catch (err) {
    res.status(400).json(responseHandler.validationResponse(err));
  }
};

const updateNoteController = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const data = await updateNote(id, title, description);
    res.status(200).json(responseHandler.successResponse(data));
  } catch (err) {
    res.status(400).json(responseHandler.validationResponse(err));
  }
};

module.exports = {
  createNote: createNoteController,
  getNoteById: getNoteByIdController,
  getNotesByTitleSubstring: getNotesByTitleSubstringController,
  updateNote: updateNoteController,
};