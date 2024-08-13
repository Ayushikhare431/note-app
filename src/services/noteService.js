
const { Op } = require('sequelize');
const { sequelize } = require("../config/db");
const Notes = require('../models/noteModel');



async function createNote(title, description) {
    try {
        const note = await Notes.create({ title, description });
        return { status: 201, data: note };

    } catch (err) {
        console.error('Error creating note:', err);
        return { status: 500, error: 'Internal Server Error' };
    }
}

async function getNoteById(id) {
    try {
        const note = await Notes.findByPk(id);
        if (!note) {
            return { status: 404, error: 'Note not found' };
        }
        return { status: 200, data: note };
    } catch (err) {
        console.error('Error getting note by ID:', err);
        return { status: 500, error: 'Internal Server Error' };
    }
}

async function getNotesByTitleSubstring(title) {
    try {
        const notes = await Notes.findAll({
            where: {
                title: {
                    [Op.like]: `%${title}%`
                }
            }
        });
        return { status: 200, data: notes };
    } catch (err) {
        console.error('Error getting notes by title substring:', err);
        return { status: 500, error: 'Internal Server Error' };
    }
}

async function updateNote(id, title, description) {
    try {
        const note = await Notes.findByPk(id);

        if (!note) {
            return { status: 404, error: 'Note not found' };
        }
        const record = {
            title, description,updated_at: new Date()
        }
        await Notes.update(record,
            {
                where: { id: id },

            }
        );
        return { status: 200, message: 'Note updated successfully' };
    } catch (err) {
        console.error('Error updating note:', err);
        return { status: 500, error: 'Internal Server Error' };
    }
}


module.exports = { createNote, getNoteById, getNotesByTitleSubstring, updateNote };